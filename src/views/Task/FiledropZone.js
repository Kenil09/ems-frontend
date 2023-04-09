import { Add, Image, Article } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
import { Modal, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoader, endLoader } from 'store/loaderSlice';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import apiClient from 'service/service';
import { taskReviewNotfication } from 'utils/notification';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    // height: 300,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none'
};

const fileSize = (bytes) => {
    const k = 1000;
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const FiledropZone = ({ open, handleClose, files, setFiles, type, taskId, handleEditClose, getTaskData, selectedUser }) => {
    const dispatch = useDispatch();
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg'],
            'application/pdf': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
        },
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles.map((file) => file.type));
            const accepted_files = acceptedFiles.filter(
                (file) =>
                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    file.type === 'application/pdf' ||
                    file.type === 'image/png' ||
                    file.type === 'image/jpeg' ||
                    file.type === 'image/jpg'
            );
            setFiles([...files, ...accepted_files]);
        }
    });

    const sendForReview = async () => {
        try {
            if (!files.length) {
                toast.error('Please insert files');
            } else {
                dispatch(startLoader());
                const { data } = await apiClient().post(
                    `task/submitTask/${taskId}`,
                    { files },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                await taskReviewNotfication(data?.task);
                dispatch(endLoader());
                toast.success(data?.message);
                handleClose();
                handleEditClose();
                getTaskData(selectedUser);
            }
        } catch (error) {
            dispatch(endLoader());
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-dropzone" aria-describedby="file-dropzone">
            <Box sx={style}>
                <Typography textAlign="center" fontSize="1.5rem" fontWeight={900} color="#06122B">
                    Add document
                </Typography>
                <section className="container doc-dropzone">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        {/* <Add color="secondary" /> */}
                        <Stack>
                            <Add color="secondary" fontSize="large" style={{ marginLeft: '35px' }} />
                            <Typography>Upload Documents</Typography>
                        </Stack>
                    </div>
                </section>
                {files.map((item, index) => (
                    <div className="dropzone-file-list" key={index}>
                        <div>{item?.type?.startsWith('image') ? <Image color="secondary" /> : <Article color="secondary" />}</div>
                        <div className="dropzone-file-name">
                            <span>{item.name}</span>
                            <span style={{ marginLeft: '5px' }}>{fileSize(item.size)}</span>
                        </div>
                        <IconButton
                            className="pointer"
                            onClick={() => {
                                const sortedFile = files.filter((item) => item !== files[index]);
                                setFiles(sortedFile);
                            }}
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.73624 0.731357C0.345722 1.12188 0.345743 1.75507 0.73624 2.14557L3.56467 4.974L0.73624 7.80242C0.345722 8.19294 0.345743 8.82614 0.73624 9.21664C1.12674 9.60714 1.75994 9.60716 2.15045 9.21664L4.97888 6.38821L7.80731 9.21664C8.1978 9.60714 8.831 9.60716 9.22152 9.21664C9.61204 8.82612 9.61202 8.19292 9.22152 7.80242L6.39309 4.974L9.22152 2.14557C9.61204 1.75505 9.61202 1.12185 9.22152 0.731357C8.83102 0.34086 8.19783 0.340839 7.80731 0.731357L4.97888 3.55978L2.15045 0.731357C1.75996 0.34086 1.12676 0.340839 0.73624 0.731357Z"
                                    fill="#FF5050"
                                />
                            </svg>
                        </IconButton>
                    </div>
                ))}
                <div className="dropzone-button-grid">
                    <Button
                        color="secondary"
                        size="large"
                        onClick={() => {
                            setFiles([]);
                            handleClose();
                        }}
                        variant="text"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            if (type === 'add') {
                                handleClose();
                            } else {
                                sendForReview();
                            }
                        }}
                        size="large"
                        variant="outlined"
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default FiledropZone;
