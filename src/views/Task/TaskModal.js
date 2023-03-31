import MainCard from 'ui-component/cards/MainCard';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormComponentGrid, FormInputGrid, FormLabelGrid, FormRowGrid } from 'ui-component/Grid/Form/CustomGrid';
import { Button, FormControl, Grid, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';
import UserSelect from 'ui-component/Form/UserSelect';
import { Attachment } from '@mui/icons-material';
import FiledropZone from './FiledropZone';
import { useEffect, useState } from 'react';
import apiClient from 'service/service';
import dayjs from 'dayjs';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import toast from 'react-hot-toast';
import getTaskAttchements from 'utils/getTaskAttchements';

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
    dueDate: ''
};

const TaskModal = ({ handleEvent, modalTitle, isEditMode, selectedUser, getTaskData }) => {
    const currentUser = useSelector(({ user }) => user.details);
    const [openDropZone, setOpenDropZone] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [attchments, setAttachments] = useState([]);
    const [files, setFiles] = useState([]);
    const [submissionFiles, setSubmissionFiles] = useState([]);
    const [dropzoneType, setDropZoneType] = useState('');
    const handleOpenDropZone = () => setOpenDropZone(true);
    const handleCloseDropZone = () => setOpenDropZone(false);

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
            setDropZoneType('create');
        } else {
            setValue('reporter', isEditMode?.reporter?._id);
            setValue('assignee', isEditMode?.assignee?._id);
            setValue('title', isEditMode?.title);
            setValue('description', isEditMode?.description);
            setValue('dueDate', isEditMode?.dueDate);
            console.log('this is running');
            getFiles(isEditMode?._id);
            setDropZoneType('edit');
        }
    }, []);

    const getFiles = async (id) => {
        const s3Files = await getTaskAttchements(id, 'attachments');
        if (s3Files.length) {
            setFiles(s3Files);
        }
        if (isEditMode?.state === 'review') {
            const s3Submisssion = await getTaskAttchements(id, 'submission');

            if (s3Submisssion.length) {
                setSubmissionFiles(s3Submisssion);
            }
        }
    };

    console.log('su', submissionFiles);

    const onSubmit = async (values) => {
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
                handleEvent();
                toast.success(data?.message);
                handleEvent();
            } catch (error) {
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

    return (
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
                                            disablePast
                                            color={'secondary'}
                                            error={Boolean(formState.dueDate?.message)}
                                            renderInput={(params) => (
                                                <TextField
                                                    variant="standard"
                                                    {...params}
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
                                <Grid item xs={12} container direction="row" alignItems="center" marginBottom={'10px'}>
                                    <Grid item xs={4}>
                                        <Typography>Assignee</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
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
                                <Grid item xs={12} container direction="row" alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography>Reporter</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <UserSelect
                                            user={watch('reporter')}
                                            setUser={(val) => {
                                                setValue('reporter', val);
                                            }}
                                            disableCurrentUser={true}
                                            searchAble={true}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={6} display="flex" flexDirection={'row'}>
                                <Button type="submit" color="secondary" size="large" variant="contained">
                                    Save
                                </Button>
                                {isEditMode && currentUser?._id === isEditMode?.assignee?._id && (
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
                                {isEditMode && currentUser?._id === isEditMode?.reporter?._id && (
                                    <Button color="secondary" sx={{ marginLeft: 2 }} size="large" variant="contained">
                                        Complete Task
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
                                        height="180px"
                                    >
                                        {files?.map((file, index) => {
                                            if (file.type === 'pdf') {
                                                return (
                                                    <div style={{ width: '150px', height: '150px', marginLeft: '10px' }}>
                                                        <Document file={file?.blob} key={index} onLoadSuccess={onDocumentLoadSuccess}>
                                                            {/* {Array.from(new Array(numPages), (el, index) => (
                                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                                ))} */}
                                                            <Page width={100} pageNumber={1} />
                                                        </Document>
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
                                        height="180px"
                                    >
                                        {submissionFiles?.map((file, index) => {
                                            if (file.type === 'pdf') {
                                                return (
                                                    <div style={{ width: '150px', height: '150px', marginLeft: '10px' }}>
                                                        <Document file={file?.blob} key={index} onLoadSuccess={onDocumentLoadSuccess}>
                                                            <Page width={100} pageNumber={1} />
                                                        </Document>
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
    );
};

export default TaskModal;
