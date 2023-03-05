import { Grid, Box, Typography, IconButton, Stack, Button, FormLabel } from '@mui/material';
import * as yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import FormInput from 'ui-component/Form/FormInput';
import { useEffect } from 'react';
import { fetchDepartments, addDepartment, updateDepartment } from 'store/departmentSlice';
import { fetchUsers } from 'store/usersSlice';
import apiClient from 'service/service';
import RecordData from 'views/utilities/RecordData';

const validationSchema = yup
    .object({
        name: yup.string('Please enter name').min(2, 'Please enter valid name').max(50, 'Too Long!').required('name is required'),
        departmentLead: yup.string('Please Enter department lead').required('Department lead is required'),
        parentDepartment: yup.string().notRequired().nullable()
    })
    .required();

const DepartmentModal = ({ open, handleEvent, modalTitle, isEditMode }) => {
    const dispatch = useDispatch();
    const userOptions = useSelector((state) => state.users.data)?.map(({ _id, firstName, lastName }) => ({
        value: _id,
        label: `${firstName} ${lastName}`
    }));
    const departmentOptions = useSelector((state) => state.department.data)?.map(({ _id, name }) => ({ label: name, value: _id }));

    let fakeDepartmens = [];
    for (let i = 0; i <= 50; i++) {
        fakeDepartmens.push({ label: 'Fake Department', value: Math.floor(100000 + Math.random() * 900000) });
    }

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            parentDepartment: null,
            departmentLead: ''
        }
    });

    const { setValue } = methods;

    useEffect(() => {
        dispatch(fetchDepartments());
        dispatch(fetchUsers());
        if (isEditMode) {
            setValue('name', isEditMode.name);
            setValue('departmentLead', isEditMode.departmentLead?._id);
            setValue('parentDepartment', isEditMode.parentDepartment?._id);
        }
    }, []);

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                const { data } = await apiClient().put(`/department/${isEditMode?._id}`, values);
                dispatch(updateDepartment(data.department));
                toast.success(data.message);
            } else {
                const { data } = await apiClient().post('/department', values);
                dispatch(addDepartment(data.department));
                toast.success(data.message);
            }
            console.log('got here');

            handleEvent();
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    };

    console.log(isEditMode);

    return (
        <MainCard title={modalTitle} backIcon handleBackEvent={handleEvent}>
            <Box style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" color="secondary">
                    Department Details
                </Typography>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <FormLabel id="label-name" required>
                                    Department Name
                                </FormLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput name="name" type="name" variant="standard" />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <FormLabel id="label-name" required>
                                    Department Lead
                                </FormLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput name="departmentLead" type="select" options={userOptions || []} variant="standard" />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container direction="row">
                            <Grid item xs={2}>
                                <FormLabel id="label-name">Parent Department</FormLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <FormInput name="parentDepartment" type="select" options={fakeDepartmens || []} variant="standard" />
                            </Grid>
                        </Grid>
                        {isEditMode && <RecordData data={isEditMode} />}
                    </Grid>

                    <Box style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-start' }}>
                        <Button type="submit" variant="contained" color="secondary">
                            {isEditMode ? 'Update' : 'Save'}
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </MainCard>
    );
};

export default DepartmentModal;
