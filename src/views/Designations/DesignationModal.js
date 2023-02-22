import { Modal, Box, Typography, IconButton, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Close from '@mui/icons-material/Close';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from 'ui-component/Form/FormInput';
// import { useGetCompaniesQuery } from 'store/Services/company';
import { useAddDesignationMutation, useUpdateDesignationMutation } from 'store/Services/designation';

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
        name: yup
            .string('Please enter designation name')
            .min(2, 'Please enter valid name')
            .max(50, 'Too Long!')
            .required('Designation name is required')
    })
    .required();

const DesignationModal = ({ open, handleEvent, modalTitle, isEditMode }) => {
    const [addDesignation] = useAddDesignationMutation();
    const [updateDesignation] = useUpdateDesignationMutation();
    // const { data: companyData } = useGetCompaniesQuery(undefined, {
    //     pollingInterval: 60000
    // });

    // const companyOptions = companyData.companies.map(({ _id, name }) => ({ id: _id, name }));

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            company: ''
        }
    });

    const onSubmit = (values) => {
        console.log('val', values);
        if (isEditMode) {
            updateDesignation({ id: isEditMode?._id, data: values });
        } else {
            addDesignation(values);
            toast.success('Designation added successfully');
        }
        handleEvent();
        // handle submit
    };

    // useEffect(() => {
    //     if (isEditMode) {
    //         setValue('name', isEditMode?.name);
    //         setValue('address', isEditMode?.address);
    //         setValue('city', isEditMode?.city);
    //         setValue('state', isEditMode?.state);
    //         setValue('zipcode', isEditMode?.zipcode);
    //     }
    // }, [isEditMode]);

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
                                {/* <FormInput name="company" label="Company" type="select" options={companyOptions} /> */}
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

export default DesignationModal;

DesignationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleEvent: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    isEditMode: PropTypes.object
};
