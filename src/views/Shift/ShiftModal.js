import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addShift, updateShift } from 'store/shiftSlice';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid } from '@mui/material';
import { FormComponentGrid, FormInputGrid, FormLabelGrid, FormRowGrid } from 'ui-component/Grid/Form/CustomGrid';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import FormInput from 'ui-component/Form/FormInput';
import { Box } from '@mui/system';
import basicWeekDefinition from 'static/basicWeekDefinition';
import WeekDefinitionForm from './WeekDefinitionForm';
import { getDepartmentOptions } from 'views/utilities/FormOptions';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import apiClient from 'service/service';

const validationSchema = yup
    .object({
        name: yup.string('Enter the shift name').required('Shift name is required'),
        startTime: yup.string('Enter the start time').required('Start time is required'),
        endTime: yup.string('Enter the end time').required('End time is required'),
        type: yup.string().oneOf(['custom', 'general']),
        applicableDepartments: yup
            .array('Enter minimum 1 department')
            .of(yup.string())
            .min(1, 'Enter minimum 1 department')
            .required('Applicable department is required')
            .when('type', {
                is: 'general',
                then: yup.array().min(0).notRequired()
            }),
        weekDefinition: yup
            .array()
            .of(
                yup.object({
                    sunday: yup.boolean().required(),
                    monday: yup.boolean().required(),
                    tuesday: yup.boolean().required(),
                    wednesday: yup.boolean().required(),
                    thursday: yup.boolean().required(),
                    friday: yup.boolean().required(),
                    saturday: yup.boolean().required()
                })
            )
            .length(5)
    })
    .required();

const defaultValues = {
    name: '',
    startTime: '',
    endTime: '',
    weekDefinition: basicWeekDefinition,
    applicableDepartments: [],
    type: 'custom'
};

const filterDepartmentOption = (departments, shifts) => {
    const usedDepartments = shifts
        .filter(({ type }) => type !== 'general')
        .map(({ applicableDepartments }) => {
            return applicableDepartments.map(({ _id }) => _id);
        })
        .flat();
    const availableDepartments = departments.filter(({ _id }) => {
        if (usedDepartments.includes(_id)) {
            return false;
        }
        return true;
    });
    return availableDepartments;
};

const ShiftModal = ({ handleEvent, modalTitle, isEditMode }) => {
    const departments = useSelector(({ department }) => department.data);
    const shifts = useSelector(({ shift }) => shift.data);
    const availableDepartments = filterDepartmentOption(departments, shifts);
    const departmentOptions = getDepartmentOptions(availableDepartments);
    const dispatch = useDispatch();
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onChange'
    });

    const { setValue, setError } = methods;

    useEffect(() => {
        if (isEditMode) {
            Object.keys(defaultValues).forEach((item) => {
                if (item === 'applicableDepartments') {
                    const data = isEditMode?.[item]?.map(({ _id }) => _id);
                    isEditMode?.type !== 'general' && setValue(item, data);
                } else {
                    isEditMode?.[item] && setValue(item, isEditMode?.[item]);
                }
            });
        }
    }, []);

    const filterTimeString = (s) => {
        return s[2] + s[3] + s[5] + s[7] + s[8];
    };

    const getTime = (value) => {
        const time = value.split(':');
        return { hour: time[0], minute: time[1] };
    };

    const validDate = (startTime, endTime) => {
        console.log(startTime, endTime, 'he');
        const start = getTime(startTime);
        const end = getTime(endTime);

        if (parseInt(start.hour) > parseInt(end.hour)) {
            return false;
        } else if (start.hour === end.hour) {
            if (start.minute < end.minute) {
                return false;
            }
        } else {
            return true;
        }
    };

    const onSubmit = async (values) => {
        delete values.type;
        values.startTime = isEditMode ? values.startTime : filterTimeString(values.startTime);
        values.endTime = isEditMode ? values.endTime : filterTimeString(values.endTime);
        if (!validDate(values.startTime, values.endTime)) {
            setError('endTime', { type: 'custom', message: 'End time should be greater than start time' });
            return;
        }
        if (isEditMode && isEditMode?.type === 'general') delete values.applicableDepartments;
        try {
            if (isEditMode) {
                isEditMode?.type;
                const { data } = await apiClient().put(`/shift/${isEditMode?._id}`, values);
                dispatch(updateShift(data.shift));
                toast.success(data.message);
            } else {
                const { data } = await apiClient().post('/shift', values);
                dispatch(addShift(data.shift));
                toast.success(data.message);
            }
            handleEvent();
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    };

    return (
        <MainCard title={modalTitle} backIcon handleBackEvent={handleEvent}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <FormRowGrid>
                            <CustomFormHeader content="Shift Information" />
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-name" required content="Shift Name" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="name" type="name" variant="standard" placeholder="Enter the shift name" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-name" required content="Start Time" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="startTime" type="time" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-name" required content="End Time" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="endTime" type="time" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        {!(isEditMode && isEditMode.type === 'general') && (
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-name" required content="Applicable Departments" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput
                                            name="applicableDepartments"
                                            type="select"
                                            multiple
                                            variant="standard"
                                            options={departmentOptions}
                                        />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>
                        )}
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-name" content="Weekend Definition" />
                                </FormLabelGrid>
                                <Grid item xs={12} sx={{ marginTop: '5px' }}>
                                    <WeekDefinitionForm />
                                </Grid>
                            </FormComponentGrid>
                        </FormRowGrid>
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

export default ShiftModal;
