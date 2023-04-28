import MainCard from 'ui-component/cards/MainCard';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormComponentGrid } from 'ui-component/Grid/Form/CustomGrid';
import { Box, Button, FormControl, Grid, IconButton, Modal, Rating, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';
import UserSelect from 'ui-component/Form/UserSelect';
import { ArrowLeft, ArrowRight, Attachment } from '@mui/icons-material';
import FiledropZone from './FiledropZone';
import { useEffect, useState } from 'react';
import apiClient from 'service/service';
import dayjs from 'dayjs';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import toast from 'react-hot-toast';
import getTaskAttchements from 'utils/getTaskAttchements';
import Comment from './Comment';
import { endLoader, startLoader } from 'store/loaderSlice';
import { taskAddNotification, taskCompleteNotification, taskReOpenNotification } from 'utils/notification';
import { IconArrowAutofitLeft, IconEye, IconTrash } from '@tabler/icons';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import FileViewModal from './FileViewModal';

const validationSchema = yup
    .object({
        title: yup.string('Enter the title').min(5, 'Too short!').required('Title is requried'),
        description: yup.string('Enter the title').min(10, 'Too short!').required('Description is required'),
        assignee: yup.string('Enter the assignee').required('Assignee is required'),
        reporter: yup.string('Enter the reporter').required('Reporter is required'),
        dueDate: yup.date('Enter the due date').typeError('Due date is required').required('Due date is required')
    })
    .required();

const initialValues = {
    title: '',
    description: '',
    assignee: '',
    reporter: '',
    dueDate: null
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const TaskModal = ({ handleEvent, modalTitle, isEditMode, selectedUser, getTaskData }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(({ user }) => user.details);
    const [openDropZone, setOpenDropZone] = useState(false);
    const [fileView, setFileView] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [fileViewData, setFileViewData] = useState(null);
    const [attchments, setAttachments] = useState([]);
    const [files, setFiles] = useState([]);
    const [rating, setRating] = useState(0);
    const [submissionFiles, setSubmissionFiles] = useState([]);
    const [dropzoneType, setDropZoneType] = useState('');
    const [isImage, setIsImage] = useState(false);
    const handleOpenDropZone = () => setOpenDropZone(true);
    const handleCloseDropZone = () => setOpenDropZone(false);
    const showFileView = () => setFileView(true);
    const hideFileView = () => setFileView(false);

    console.log('files', files);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onChange'
    });
    const { watch, setValue, formState } = methods;

    useEffect(() => {
        if (!isEditMode) {
            setValue('reporter', currentUser?._id);
            setValue('assignee', selectedUser);
            setDropZoneType('add');
        } else {
            setValue('reporter', isEditMode?.reporter?._id);
            setValue('assignee', isEditMode?.assignee?._id);
            setValue('title', isEditMode?.title);
            setValue('description', isEditMode?.description);
            setValue('dueDate', isEditMode?.dueDate);
            console.log('this is running', isEditMode);
            getFiles(isEditMode?._id);
            setDropZoneType('edit');
        }
    }, []);

    const getFiles = async (id) => {
        // dispatch(startLoader());
        const s3Files = await getTaskAttchements(id, 'attachments');
        if (s3Files.length) {
            setFiles(s3Files);
        } else {
            setFiles([]);
        }
        if (isEditMode?.state === 'review') {
            const s3Submisssion = await getTaskAttchements(id, 'submission');

            if (s3Submisssion.length) {
                setSubmissionFiles(s3Submisssion);
            } else {
                setSubmissionFiles([]);
            }
        }
        // dispatch(endLoader());
    };

    const ratingPermission = () => {
        if (isEditMode && isEditMode?.state !== 'assigned') {
            if (currentUser?.role === 'admin' || currentUser?._id === isEditMode?.repoter?._id) {
                return true;
            }
        }
        return false;
    };

    const handleCompleteTask = async () => {
        if (rating === 0) {
            toast.error('Rating is required');
            return;
        }
        dispatch(startLoader());
        try {
            const { data } = await apiClient().post(`/task/completeTask/${isEditMode?._id}`, {
                rating
            });
            await taskCompleteNotification(data?.task);
            handleEvent();
            toast.success(data?.message);
            dispatch(endLoader());
        } catch (error) {
            dispatch(endLoader());
            handleEvent();
            toast.error(error?.response?.data?.message);
        }
    };

    const handleReOpen = async () => {
        dispatch(startLoader());
        try {
            const { data } = await apiClient().get(`/task/reassign/${isEditMode?._id}`);
            handleEvent();
            await taskReOpenNotification(data?.task);
            toast.success(data?.message);
            dispatch(endLoader());
        } catch (error) {
            dispatch(endLoader());
            handleEvent();
            toast.error(error?.response?.data?.message);
        }
    };

    const onSubmit = async (values) => {
        dispatch(startLoader());
        if (!isEditMode) {
            try {
                if (attchments.length) {
                    values.attchments = attchments;
                }
                console.log(values);
                const { data } = await apiClient().post('/task/assignTask', values, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                dispatch(endLoader());
                await taskAddNotification(data?.task);
                handleEvent();
                toast.success(data?.message);
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        } else {
            try {
                const { data } = await apiClient().put(`/task/${isEditMode?._id}`, values, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success(data?.message);
                dispatch(endLoader());

                handleEvent();
            } catch (error) {
                console.log('err', error);
                dispatch(endLoader());

                handleEvent();
                toast.error(error?.response?.data?.message);
            }
        }
        getTaskData(selectedUser);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const downloadAttachments = () => {
        files.forEach((file) => {
            if (file.type === 'pdf') {
                const blob = new Blob([file?.buffer], { type: 'application/pdf' });
                // Create a URL for the PDF file
                const pdfURL = URL.createObjectURL(blob);

                // Create a link element and set its attributes
                const link = document.createElement('a');
                link.href = pdfURL;
                link.download = file.name;

                // Click the link to trigger the download
                link.click();

                // Release the URL object
                URL.revokeObjectURL(pdfURL);
            }
            if (['jpeg', 'png', 'jpg'].includes(file.type)) {
                const blob = new Blob([file?.buffer], { type: `image/${file.type}` });
                // Create a URL for the PDF file
                const pdfURL = URL.createObjectURL(blob);

                // Create a link element and set its attributes
                const link = document.createElement('a');
                link.href = pdfURL;
                link.download = file.name;

                // Click the link to trigger the download
                link.click();

                // Release the URL object
                URL.revokeObjectURL(pdfURL);
            }
        });
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const deleteAttachment = async (payload) => {
        try {
            dispatch(startLoader());
            const { data } = await apiClient().post(`/task/removeFile`, payload);
            toast.success(data?.message);
            await getFiles();
        } catch (error) {
            console.log('err', error);
            toast.error(error?.response?.data?.message);
        } finally {
            dispatch(endLoader());
        }
    };

    const FileButtons = ({ type, index, image, name }) => (
        <div style={{ display: 'flex', justifyContent: 'center', marginRight: image ? '0px' : '30px' }}>
            <IconButton
                onClick={() => {
                    if (image) {
                        setIsImage(true);
                    } else {
                        setIsImage(false);
                    }
                    if (type === 'attachment') {
                        setFileViewData(files[index]);
                    } else {
                        setFileViewData(submissionFiles[index]);
                    }
                    showFileView();
                }}
                color="secondary"
            >
                <IconEye />
            </IconButton>
            <IconButton
                sx={{ color: 'error.main' }}
                onClick={(e) => {
                    e.stopPropagation();
                    const payload = {
                        key: name,
                        taskId: isEditMode?._id
                    };
                    deleteAttachment(payload);
                }}
            >
                <IconTrash />
            </IconButton>
        </div>
    );
    return (
        <>
            {!fileView ? (
                <MainCard title={modalTitle} backIcon handleBackEvent={handleEvent}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={8} container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                {...methods.register('title')}
                                                placeholder="Add title here"
                                                color="secondary"
                                                error={Boolean(formState?.title?.message)}
                                                helperText={formState?.title?.message}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                {...methods.register('description')}
                                                multiline={true}
                                                rows={4}
                                                color="secondary"
                                                placeholder="Add description here"
                                                error={Boolean(formState?.description?.message)}
                                                helperText={formState?.description?.message}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormComponentGrid>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    {...methods.register('dueDate')}
                                                    label={'Enter the due date'}
                                                    value={dayjs(methods.watch('dueDate'))}
                                                    onChange={(newValue) => {
                                                        methods.setValue('dueDate', dayjs(newValue).toISOString());
                                                    }}
                                                    disablePast={!isEditMode}
                                                    error={Boolean(formState.dueDate?.message)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            variant="standard"
                                                            {...params}
                                                            color="secondary"
                                                            error={Boolean(formState.dueDate?.message)}
                                                            helperText={formState.dueDate?.message}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </FormComponentGrid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4} container spacing={2} justifyContent="center">
                                    <Grid
                                        item
                                        xs={12}
                                        margin={2}
                                        borderRadius="12px"
                                        borderColor="rgb(200,200,200)"
                                        border={'0.5px solid rgb(200,200,200)'}
                                        sx={{ background: '#FAFAFA', ':hover': { borderColor: 'rgb(118, 118, 118)' } }}
                                    >
                                        <Grid item xs={12} marginBottom="10px">
                                            <CustomFormHeader content="Details" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <hr style={{ marginRight: '10px' }} />
                                        </Grid>
                                        <Grid item xs={12} container direction="row" alignItems="center" marginBottom={'10px'}>
                                            <Grid item xs={4}>
                                                <Typography>Assignee</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <UserSelect
                                                    user={watch('assignee')}
                                                    setUser={(val) => {
                                                        setValue('assignee', val);
                                                    }}
                                                    disableCurrentUser={true}
                                                    searchAble={true}
                                                />
                                            </Grid>
                                        </Grid>
                                        {
                                            <Grid item xs={12} container direction="row" alignItems="center">
                                                <Grid item xs={4}>
                                                    <Typography>Reporter</Typography>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <UserSelect
                                                        reporter
                                                        user={watch('reporter')}
                                                        setUser={(val) => {
                                                            setValue('reporter', val);
                                                        }}
                                                        disableCurrentUser={true}
                                                        searchAble={true}
                                                    />
                                                </Grid>
                                            </Grid>
                                        }
                                        {ratingPermission() && (
                                            <>
                                                <Grid item xs={12} container direction="row" alignItems="center" marginTop="10px">
                                                    <Grid item xs={4}>
                                                        <Typography>Rating</Typography>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Rating
                                                            name="rating"
                                                            disabled={isEditMode?.state === 'completed'}
                                                            value={isEditMode?.rating ? isEditMode?.rating : rating}
                                                            onChange={handleRatingChange}
                                                            precision={0.5}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2}>
                                    <Grid item xs={6} display="flex" flexDirection={'row'}>
                                        {!isEditMode && (
                                            <Button type="submit" color="secondary" size="large" variant="contained">
                                                Save
                                            </Button>
                                        )}
                                        {isEditMode &&
                                            currentUser?._id === isEditMode?.assignee?._id &&
                                            isEditMode.state === 'assigned' && (
                                                <Button
                                                    color="secondary"
                                                    sx={{ marginLeft: 2 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenDropZone();
                                                    }}
                                                    size="large"
                                                    variant="contained"
                                                >
                                                    Send For Review
                                                </Button>
                                            )}
                                        {ratingPermission() && isEditMode.state === 'review' && (
                                            <Button
                                                color="secondary"
                                                sx={{ marginLeft: 2 }}
                                                size="large"
                                                variant="contained"
                                                onClick={() => handleCompleteTask()}
                                            >
                                                Complete Task
                                            </Button>
                                        )}
                                        {ratingPermission() && isEditMode.state === 'completed' && (
                                            <Button
                                                color="secondary"
                                                sx={{ marginLeft: 2 }}
                                                size="large"
                                                variant="contained"
                                                onClick={() => handleReOpen()}
                                            >
                                                Re-Open Task
                                            </Button>
                                        )}
                                        {!isEditMode && (
                                            <Button
                                                startIcon={<Attachment />}
                                                sx={{ marginLeft: 2 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleOpenDropZone();
                                                }}
                                                color="secondary"
                                            >
                                                Attach
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>

                                {isEditMode && files.length ? (
                                    <>
                                        <Grid item xs={12}>
                                            <CustomFormHeader content="Attachments" />
                                        </Grid>
                                        <Grid item xs={12} container spacing={2}>
                                            <Grid
                                                item
                                                xs={12}
                                                margin={2}
                                                borderRadius="12px"
                                                borderColor="rgb(200,200,200)"
                                                border={'0.5px solid rgb(200,200,200)'}
                                                sx={{ background: '#FAFAFA', ':hover': { borderColor: 'rgb(118, 118, 118)' } }}
                                                display="flex"
                                                flexDirection="row"
                                                flexWrap="wrap"
                                                // minHeight="170px"
                                                height="210px"
                                            >
                                                {files?.map((file, index) => {
                                                    if (file.type === 'pdf') {
                                                        return (
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    flexDirection: 'column'
                                                                }}
                                                            >
                                                                <div style={{ width: '150px', height: '150px', marginLeft: '10px' }}>
                                                                    <Document
                                                                        options={{ workerSrc: 'pdf.woker.js' }}
                                                                        file={file?.blob}
                                                                        key={index}
                                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                                        onLoadError={(error) => console.log(error)}
                                                                    >
                                                                        {/* {Array.from(new Array(numPages), (el, index) => (
                                                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                                    ))} */}
                                                                        <Page width={100} pageNumber={1} renderTextLayer={false} />
                                                                    </Document>
                                                                </div>
                                                                <FileButtons type="attachment" index={index} name={file?.name} />
                                                            </div>
                                                        );
                                                    }
                                                    if (['jpeg', 'png', 'jpg'].includes(file.type)) {
                                                        return (
                                                            <div style={{ marginLeft: '10px' }}>
                                                                <img
                                                                    src={URL.createObjectURL(file?.blob)}
                                                                    width="115px"
                                                                    height="150px"
                                                                    alt="attachments"
                                                                />
                                                                <FileButtons type="attachment" index={index} image name={file?.name} />
                                                            </div>
                                                        );
                                                    }
                                                })}
                                            </Grid>
                                            <Button
                                                sx={{ marginLeft: '10px' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    downloadAttachments();
                                                }}
                                                color="secondary"
                                            >
                                                Download Attachments
                                            </Button>
                                        </Grid>
                                    </>
                                ) : null}
                                {isEditMode && submissionFiles.length ? (
                                    <>
                                        <Grid item xs={12}>
                                            <CustomFormHeader content="Submission Files" />
                                        </Grid>
                                        <Grid item xs={12} container spacing={2}>
                                            <Grid
                                                item
                                                xs={12}
                                                margin={2}
                                                borderRadius="12px"
                                                borderColor="rgb(200,200,200)"
                                                border={'0.5px solid rgb(200,200,200)'}
                                                sx={{ background: '#FAFAFA', ':hover': { borderColor: 'rgb(118, 118, 118)' } }}
                                                display="flex"
                                                flexDirection="row"
                                                flexWrap="wrap"
                                                // minHeight="170px"
                                                height="210px"
                                            >
                                                {submissionFiles?.map((file, index) => {
                                                    if (file.type === 'pdf') {
                                                        return (
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    flexDirection: 'column'
                                                                }}
                                                            >
                                                                <div style={{ width: '150px', height: '150px', marginLeft: '10px' }}>
                                                                    <Document
                                                                        file={file?.blob}
                                                                        key={index}
                                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                                    >
                                                                        <Page width={100} pageNumber={1} renderTextLayer={false} />
                                                                    </Document>
                                                                </div>
                                                                <FileButtons type="submission" index={index} name={file?.name} />
                                                            </div>
                                                        );
                                                    }
                                                    if (['jpeg', 'png', 'jpg'].includes(file.type)) {
                                                        return (
                                                            <div style={{ marginLeft: '10px' }}>
                                                                <img
                                                                    src={URL.createObjectURL(file?.blob)}
                                                                    width="115px"
                                                                    height="150px"
                                                                    alt="attachments"
                                                                />
                                                                <FileButtons type="submission" index={index} image name={file?.name} />
                                                            </div>
                                                        );
                                                    }
                                                })}
                                            </Grid>
                                            <Button
                                                sx={{ marginLeft: '10px' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    downloadAttachments();
                                                }}
                                                color="secondary"
                                            >
                                                Download Submission Files
                                            </Button>
                                        </Grid>
                                    </>
                                ) : null}
                                {isEditMode ? (
                                    <Grid item xs={12} container spacing={2}>
                                        <Comment task={isEditMode?._id} />
                                    </Grid>
                                ) : null}
                            </Grid>
                        </form>
                    </FormProvider>
                    <FiledropZone
                        open={openDropZone}
                        handleClose={handleCloseDropZone}
                        files={attchments}
                        setFiles={setAttachments}
                        type={dropzoneType}
                        taskId={isEditMode?._id}
                        handleEditClose={handleEvent}
                        getTaskData={getTaskData}
                        selectedUser={selectedUser}
                    />
                </MainCard>
            ) : (
                <FileViewModal view={fileView} hideFileView={hideFileView} data={URL.createObjectURL(fileViewData?.blob)} image={isImage} />
            )}
        </>
    );
};

export default TaskModal;
