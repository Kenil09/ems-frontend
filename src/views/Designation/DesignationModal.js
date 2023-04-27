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
import SystemFields from 'views/utilities/SystemFields';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { FormRowGrid, FormComponentGrid, FormInputGrid, FormLabelGrid } from 'ui-component/Grid/Form/CustomGrid';
import { addDesignation, updateDesignation } from 'store/designationSlice';

const validationSchema = yup
    .object({
        name: yup.string('Please enter name').min(2, 'Please enter valid name').max(50, 'Too Long!').required('name is required')
    })
    .required();

const DesignationModal = ({ open, handleEvent, modalTitle, isEditMode }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(({ user }) => user.details);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: ''
        }
    });

    const { setValue } = methods;

    useEffect(() => {
        dispatch(fetchDepartments());
        dispatch(fetchUsers(currentUser?.company?._id));
        if (isEditMode) {
            setValue('name', isEditMode.name);
        }
    }, []);

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                const { data } = await apiClient().put(`/designation/${isEditMode?._id}`, values);
                dispatch(updateDesignation(data.designation));
                toast.success(data.message);
            } else {
                const { data } = await apiClient().post('/designation', values);
                dispatch(addDesignation(data.designation));
                toast.success(data.message);
            }
            console.log('got here');

            handleEvent();
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    };

    return (
        <MainCard title={modalTitle} backIcon handleBackEvent={handleEvent}>
            <Box style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" color="secondary">
                    Designation Details
                </Typography>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-name" required content="Designation Name" />
                                </FormLabelGrid>
                                <Grid item xs={6} marginLeft={2}>
                                    <FormInput name="name" type="name" variant="standard" placeholder="Enter designation name" />
                                </Grid>
                            </FormComponentGrid>
                        </FormRowGrid>

                        {isEditMode && <SystemFields data={isEditMode} />}
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

export default DesignationModal;
