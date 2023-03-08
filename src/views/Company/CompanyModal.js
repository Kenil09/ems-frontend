import { Modal, Box, Typography, IconButton, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Close from '@mui/icons-material/Close';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import FormInput from 'ui-component/Form/FormInput';
import { useEffect } from 'react';
import { useAddCompanyMutation, useUpdateCompanyMutation } from 'store/Services/company';

const style = {
    position: 'relative',
    maxWidth: 500,
    width: 'auto',
    margin: '1.75rem auto',
    bgcolor: 'background.paper',
    boxShadow: 12,
    borderRadius: 1,
    p: 3
};

const validationSchema = yup
    .object({
        name: yup.string('Please enter name').min(2, 'Please enter valid name').max(50, 'Too Long!').required('name is required'),
        address: yup.string('Please enter address').required('Address is required'),
        zipcode: yup
            .string('Please enter zipcode')
            .matches(/^[0-9]+$/, 'zip code should be number')
            .length(6, 'zip code length must be 6')
            .required(),
        state: yup.string('Please enter state').required('State is required'),
        city: yup.string('Please enter city').required('City is required')
    })
    .required();

const CompanyModal = ({ open, handleEvent, modalTitle, isEditMode }) => {
    const [addCompany] = useAddCompanyMutation();
    const [updateCompany] = useUpdateCompanyMutation();
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { setValue } = methods;

    const onSubmit = (values) => {
        if (isEditMode) {
            updateCompany({ id: isEditMode?._id, data: values });
            toast.success('Company updated successfully');
        } else {
            addCompany(values);
            toast.success('Company added successfully');
        }
        handleEvent();
        // handle submit
    };

    useEffect(() => {
        if (isEditMode) {
            setValue('name', isEditMode?.name);
            setValue('address', isEditMode?.address);
            setValue('city', isEditMode?.city);
            setValue('state', isEditMode?.state);
            setValue('zipcode', isEditMode?.zipcode);
        }
    }, [isEditMode]);

    return (
        <Modal open={open} onClose={handleEvent} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                    <Box style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h3" color="secondary">
                            {modalTitle}
                        </Typography>
                        <IconButton onClick={handleEvent}>
                            <Close />
                        </IconButton>
                    </Box>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <FormInput name="name" label="Name" type="name" />
                                <FormInput name="address" label="Adresss" type="address" />
                                <FormInput name="city" label="City" type="city" />
                                <FormInput name="state" label="State" type="state" />
                                <FormInput name="zipcode" label="Zipcode" type="zipcode" />
                            </Stack>
                            <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained" color="secondary">
                                    save
                                </Button>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Box>
        </Modal>
    );
};

export default CompanyModal;

CompanyModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleEvent: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    isEditMode: PropTypes.object
};
