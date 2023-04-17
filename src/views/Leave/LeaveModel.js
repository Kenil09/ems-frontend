import { Grid, Box, Typography, IconButton, Stack, Button, FormLabel } from '@mui/material';
import * as yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import FormInput from 'ui-component/Form/FormInput';
import { useEffect } from 'react';
import apiClient from 'service/service';
import SystemFields from 'views/utilities/SystemFields';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { useState } from 'react';

const validationSchema = yup
    .object({
        leaveType: yup.string('please Select Valid Type').required('LeaveType is required'),
        fromDate: yup.date().required('FromDate is Required').typeError('Invalid Date'),
        toDate: yup
            .date('Enter Valid Date')
            .min(yup.ref('fromDate'), 'Enter Valid Date')
            .required('ToDate is required')
            .typeError('Invalid Date'),
        reason: yup.string('Please enter Reason').min(2, 'Please enter valid Reason').required('Reason is required')
    })
    .required();
export const LeaveModel = ({ handleEvent, modalTitle, open, setOpen, viewLeave, isEditMode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.details);
    const LeaveOptions = [
        { value: 'casualLeave', label: 'Casual Leave' },
        { value: 'earnedLeave', label: 'Earned Leave' },
        { value: 'leaveWithoutPay', label: 'Leave Without Pay' },
        { value: 'sabbaticalLeave', label: 'Sabbatical Leave' },
        { value: 'sickLeave', label: 'Sick Leave' }
    ];

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            employee: user._id,
            leaveType: '',
            fromDate: '',
            toDate: '',
            reason: ''
        }
    });

    const onSubmit = async (values) => {
        try {
            const data = await apiClient().post('/leave/applyleave', values);
            toast.success(data.data.message);
            handleEvent();
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <MainCard title={modalTitle} backIcon handleBackEvent={handleEvent}>
            <Box style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" color="secondary">
                    Leave Details
                </Typography>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <CustomFormLabel id="label-leaveType" required content="Leave type" />
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput
                                    name="leaveType"
                                    type="select"
                                    defaultValues={viewLeave?.LeaveType}
                                    disabled={viewLeave?.LeaveType ? true : false}
                                    options={LeaveOptions}
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <CustomFormLabel id="label-fromDate" required content="From Date" />
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput
                                    name="fromDate"
                                    defaultValues={viewLeave?.FromDate}
                                    disabled={viewLeave?.FromDate ? true : false}
                                    type="date"
                                    disablePast
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <CustomFormLabel id="label-toDate" required content="To Date" />
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput
                                    name="toDate"
                                    type="date"
                                    disablePast
                                    defaultValues={viewLeave?.ToDate}
                                    disabled={viewLeave?.ToDate ? true : false}
                                    variant="standard"
                                    searchAble
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <CustomFormLabel id="label-reason" required content="Reason For Leave" />
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput
                                    name="reason"
                                    type="text"
                                    defaultValues={viewLeave?.Reason}
                                    disabled={viewLeave?.Reason ? true : false}
                                    variant="standard"
                                    multiline
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-start' }}>
                        <Button type="submit" variant="contained" color="secondary">
                            Apply
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </MainCard>
    );
};
