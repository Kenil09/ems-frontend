import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient from 'service/service';
import toast from 'react-hot-toast';
import { FormProvider } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '18px 25px',
    border: 'none',
    outline: 'none'
};
const validationSchema = yup
    .object({
        casualLeave: yup.string('Please Enter Casual Leave Days').required('Please Enter Casual Leave Days'),
        earnedLeave: yup.string('Please Enter Earned Leave Days').required('Please Enter Earned Leave Days'),
        leaveWithoutPay: yup.string("Please Enter Leavewithout Leave's Days").required("Please Enter Leavewithout Leave's Days"),
        sabbaticalLeave: yup.string("Please Enter Sabbatical Leave's Days").required("Please Enter Sabbatical Leave's Days"),
        sickLeave: yup.string("Please Enter Sick Leave's Days").required("Please Enter Sick Leave's Days")
    })
    .required();

const defaultValues = {
    casualLeave: '',
    earnedLeave: '',
    leaveWithoutPay: '',
    sabbaticalLeave: '',
    sickLeave: ''
};
export const SetLeaveAccountModel = ({ open, user, setOpen }) => {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    });
    const {
        handleSubmit,
        setValue,
        register,
        formState: { isSubmitting, errors }
    } = methods;
    // //(user, 'user');
    const Submit = async (values) => {
        try {
            const { casualLeave, earnedLeave, leaveWithoutPay, sabbaticalLeave, sickLeave } = values;
            // // //(values);
            let id = user.company._id;
            const newPayload = { companyId: id, casualLeave, earnedLeave, leaveWithoutPay, sabbaticalLeave, sickLeave };
            // //(newPayload, 'newPayload');
            const data = await apiClient().post('/leave/setLeaves', newPayload);
            toast.success(data.data.message);
            window.location.reload();
            setOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
            // //(err);
        }
    };

    return (
        <React.Fragment>
            <Modal open={open}>
                <Box component="div" sx={style}>
                    <Typography id="modal-modal-title" variant="h2" textAlign="center" color="secondary" sx={{ mb: 3 }}>
                        Leaves For All Employee
                    </Typography>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(Submit)}>
                            <Box style={{ padding: '0px', display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    label="Casual leave's Days"
                                    name="casualLeave"
                                    error={Boolean(errors?.casualLeave?.message.length)}
                                    helperText={errors?.casualLeave?.message}
                                    type="number"
                                    {...register('casualLeave')}
                                />
                                <TextField
                                    label="Earned leave's Days"
                                    type="number"
                                    name="earnedLeave"
                                    error={Boolean(errors?.earnedLeave?.message.length)}
                                    helperText={errors?.earnedLeave?.message}
                                    sx={{ mt: 1.5 }}
                                    {...register('earnedLeave')}
                                />
                                <TextField
                                    label="Leave Without pay's Days"
                                    type="number"
                                    name="leaveWithoutPay"
                                    sx={{ mt: 1.5 }}
                                    error={Boolean(errors?.leaveWithoutPay?.message.length)}
                                    helperText={errors?.leaveWithoutPay?.message}
                                    {...register('leaveWithoutPay')}
                                />
                                <TextField
                                    label="Sabbatical Leave's Days"
                                    type="number"
                                    name="sabbaticalLeave"
                                    error={Boolean(errors?.sabbaticalLeave?.message.length)}
                                    helperText={errors?.sabbaticalLeave?.message}
                                    sx={{ mt: 1.5 }}
                                    {...register('sabbaticalLeave')}
                                />
                                <TextField
                                    label="Sick Leave's Days"
                                    type="number"
                                    name="sickLeave"
                                    error={Boolean(errors?.sickLeave?.message.length)}
                                    helperText={errors?.sickLeave?.message && errors?.sickLeave?.message}
                                    sx={{ mt: 1.5 }}
                                    {...register('sickLeave')}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        // component={RouterLink}
                                        width="100px"
                                        color="secondary"
                                        loading={isSubmitting}
                                        sx={{ mt: 2 }}
                                    >
                                        Submit
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Modal>
        </React.Fragment>
    );
};
