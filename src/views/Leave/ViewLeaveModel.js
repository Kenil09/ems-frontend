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
    const user = useSelector((state) => state.user.user);
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
                            <Grid item xs={12} container direction="row">
                                <Grid item xs={3}>
                                    <h5>Name</h5>
                                </Grid>
                                <Grid item xs={9}>
                                    <h6>
                                        :&nbsp; {viewLeave?.firstName} {viewLeave?.lastName}
                                    </h6>
                                </Grid>
                            </Grid>
                        )}
                        {viewLeave?.email && (
                            <Grid item xs={12} container direction="row">
                                <Grid item xs={3}>
                                    <h5>Email</h5>
                                </Grid>
                                <Grid item xs={9}>
                                    <h6>:&nbsp; {viewLeave?.email}</h6>
                                </Grid>
                            </Grid>
                        )}

                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <h5>Leave type </h5>
                            </Grid>
                            <Grid item xs={9}>
                                <h6>:&nbsp; {formateLeave(viewLeave?.LeaveType)}</h6>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <h5>From Date </h5>
                            </Grid>
                            <Grid item xs={9}>
                                <h6>:&nbsp; {addDays(viewLeave?.FromDate).toISOString().split('T')[0]}</h6>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <h5>To Date </h5>
                            </Grid>
                            <Grid item xs={9}>
                                <h6>:&nbsp; {addDays(viewLeave?.ToDate).toISOString().split('T')[0]}</h6>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <h5>Reason </h5>
                            </Grid>
                            <Grid item xs={9}>
                                <h6>:&nbsp; {viewLeave?.Reason}</h6>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={3}>
                                <h5>Date of Request</h5>
                            </Grid>
                            <Grid item xs={9}>
                                <h6>:&nbsp; {new Date(viewLeave?.createdAt).toISOString().split('T')[0]}</h6>
                            </Grid>
                        </Grid>

                        {viewLeave?.CancelledMessage && (
                            <Grid item xs={12} container direction="row">
                                <Grid item xs={3}>
                                    <h5>Cancelled Message</h5>
                                </Grid>
                                <Grid item xs={9}>
                                    <h6 style={{ color: 'red' }}>:&nbsp; {viewLeave?.CancelledMessage}</h6>
                                </Grid>
                            </Grid>
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
