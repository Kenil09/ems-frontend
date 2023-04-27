import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Button from '@mui/material/Button';
import { UserStep } from './UserStep';
import { SignUpStepper } from './SignUpStepper';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import { CompanyStep } from './CompanyStep';
import { useDispatch } from 'react-redux';
import { deleteCacheData } from 'store/SignUpSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

export const SignupModel = ({ open, handleClose }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();
    const handleUser = async (payload) => {
        try {
            const newPayload = {
                userDetails: payload.User,
                companyDetails: payload.Company
            };
            //(newPayload, 'newpayload');
            const data = await axios.post('http://localhost:3001/company/', newPayload);
            handleClose();
            toast.success('Email has been sent to register email, Please verify you mail');

            //('successfully');
            //(data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    const handleEvent = () => {
        dispatch(deleteCacheData());
        handleClose();
        setActiveStep(0);
    };
    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={() => {
                    setActiveStep(0);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        outline: 0
                    }}
                >
                    <Box sx={style}>
                        <Typography variant="h1" sx={{ color: '#5e35b1', textAlign: 'center', marginTop: '5px' }}>
                            Sign Up
                        </Typography>
                        <>
                            <IconButton sx={{ marginLeft: '380px', marginTop: '-60px' }} onClick={handleEvent}>
                                <CloseIcon sx={{ color: '#000', fontSize: '30px' }} />
                            </IconButton>
                        </>
                        <SignUpStepper st={activeStep} />
                        {activeStep === 0 && <UserStep type="User" setActiveStep={setActiveStep} />}
                        {activeStep === 1 && (
                            <CompanyStep
                                type="company"
                                setActiveStep={setActiveStep}
                                handleClose={handleClose}
                                handleUser={handleUser}
                                handleEvent={handleEvent}
                            />
                        )}
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
};
