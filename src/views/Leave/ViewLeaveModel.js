import React from 'react';
import { Grid, Box, Typography, IconButton, Stack, Button, FormLabel } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useForm, FormProvider } from 'react-hook-form';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { addDays, formateLeave } from './LeaveDataGrid';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from 'service/service';
import { ConfirmationModal, ConfirmationModalWithReason } from 'ui-component/ConformationModel/ConfirmationModal';
import { cancelLeave, fetchAllLeaves } from 'store/allLeaveSlice';
import { cancelLeaveTaken, fetchAllLeaveAccount } from 'store/allLeaveAccount';

function isDateGreaterThanToday(dateStr) {
    const inputDate = new Date(dateStr);

    const today = new Date();

    if (inputDate > today) {
        return true;
    } else {
        return false;
    }
}

export const ViewLeaveModel = ({ viewLeave, handleEvent }) => {
    //(viewLeave, 'viewLeave');
    const [open, setOpen] = React.useState(false);
    const user = useSelector((state) => state.user.details);
    const [cancellationMessage, setCancellationMessage] = React.useState('');
    const dispatch = useDispatch();

    const handleConfirm = (message) => {
        //('Confirmed with message: ', message);
        setCancellationMessage(message);
        handleCancel(message);
        setOpen(!open);
    };
    const handleCancel = async (message) => {
        const leaveId = viewLeave._id;
        const { employee, duration, LeaveType } = viewLeave;
        let data;
        let payload;
        try {
            if (message) {
                payload = { userId: user._id, CancelledMessage: message };
                data = await apiClient().post(`/leave/cancelledleave/${leaveId}`, payload);
            } else {
                payload = { userId: user._id };
                data = await apiClient().post(`/leave/cancelledleave/${leaveId}`, payload);
            }

            toast.success(data.data.message);
            if (message) {
                dispatch(cancelLeave({ leaveId, message }));
            } else {
                dispatch(cancelLeave({ leaveId }));
            }
            dispatch(cancelLeaveTaken({ employee, duration, LeaveType }));
            handleEvent();
        } catch (err) {
            //(err);
            console.log(err);
            toast.error(err?.response?.data?.error);
        }
    };
    return (
        <div>
            <MainCard
                title={
                    <Typography color="secondary" style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                        {viewLeave?.Status === 'Rejected' ? 'Cancelled Leave Details' : 'Leave Details'}
                    </Typography>
                }
                backIcon
                handleBackEvent={handleEvent}
            >
                <FormProvider>
                    {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
                    <Grid container spacing={2}>
                        {viewLeave?.firstName && (
                            <>
                                <Grid item xs={12} container direction="row">
                                    <Grid item xs={3}>
                                        <Typography variant="h4" fontWeight={'normal'}>
                                            Name
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h4" fontWeight={'normal'}>
                                            :&nbsp;&nbsp;&nbsp;&nbsp; {viewLeave?.firstName} {viewLeave?.lastName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        {viewLeave?.email && (
                            <>
                                <Grid item xs={12} container direction="row">
                                    <Grid item xs={3}>
                                        <Typography variant="h4" fontWeight={'normal'}>
                                            Email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h4" fontWeight={'normal'}>
                                            :&nbsp;&nbsp;&nbsp;&nbsp; {viewLeave?.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    Leave type{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    :&nbsp;&nbsp;&nbsp;&nbsp; {formateLeave(viewLeave?.LeaveType)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br></br>{' '}
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    From Date{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    :&nbsp;&nbsp;&nbsp;&nbsp; {addDays(viewLeave?.FromDate).toISOString().split('T')[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br></br>{' '}
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    To Date{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    :&nbsp;&nbsp;&nbsp;&nbsp; {addDays(viewLeave?.ToDate).toISOString().split('T')[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br></br>{' '}
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    Reason{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    :&nbsp;&nbsp;&nbsp;&nbsp; {viewLeave?.Reason}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br></br>{' '}
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    Date of Request
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" fontWeight={'normal'}>
                                    :&nbsp;&nbsp;&nbsp;&nbsp; {new Date(viewLeave?.createdAt).toISOString().split('T')[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                        {viewLeave?.CancelledMessage && (
                            <>
                                <Grid item xs={12} container direction="row">
                                    <Grid item xs={3}>
                                        <Typography variant="h4" fontWeight={'normal'}>
                                            Cancelled Message
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography style={{ color: 'red' }} fontWeight="bold" variant="h4">
                                            :&nbsp;&nbsp;&nbsp;&nbsp; {viewLeave?.CancelledMessage}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <br />
                            </>
                        )}
                    </Grid>

                    <Box style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                        {viewLeave?.Status !== 'Rejected' ? (
                            <Button type="submit" color="secondary" onClick={handleEvent}>
                                Back
                            </Button>
                        ) : (
                            <Button type="submit" variant="contained" color="secondary" onClick={handleEvent}>
                                Back
                            </Button>
                        )}
                        {viewLeave?.Status !== 'Rejected' &&
                            isDateGreaterThanToday(viewLeave?.ToDate) &&
                            user._id === viewLeave.employee && (
                                <Button type="submit" variant="contained" onClick={() => setOpen(true)} color="secondary">
                                    Cancel leave
                                </Button>
                            )}
                        {viewLeave?.Status !== 'Rejected' && user._id !== viewLeave.employee && (
                            <Button type="submit" variant="contained" onClick={() => setOpen(true)} color="secondary">
                                Cancel leave
                            </Button>
                        )}
                    </Box>
                    {/* </form> */}
                </FormProvider>
            </MainCard>
            {user._id === viewLeave.employee ? (
                <ConfirmationModal
                    open={open}
                    onClose={() => setOpen(false)}
                    onConfirm={handleCancel}
                    title="Cancel Leave"
                    message="Are you sure you want to cancel Leave?"
                />
            ) : (
                <ConfirmationModalWithReason
                    open={open}
                    onClose={() => setOpen(false)}
                    onConfirm={handleConfirm}
                    title="Cancel Leave"
                    message="Are you sure you want to cancel this order? Please provide a cancellation reason below."
                />
            )}
        </div>
    );
};
