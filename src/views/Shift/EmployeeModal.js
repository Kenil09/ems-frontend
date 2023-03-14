import { Grid, Box, Button, TextField, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import * as yup from 'yup';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from 'ui-component/Form/FormInput';

import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { FormComponentGrid, FormRowGrid, FormLabelGrid, FormInputGrid } from 'ui-component/Grid/Form/CustomGrid';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';

import { getDepartmentOptions } from 'views/utilities/FormOptions';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const EmployeeModel = () => {
    const dispatch = useDispatch();
    const departmentOptions = getDepartmentOptions(useSelector(({ department }) => department.data));

    const validationSchema = yup
        .object({
            name: yup.string('Enter the first name').required('First name is required')
        })
        .required();
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: ''
        },
        mode: 'onChange'
    });

    const { setValue, value } = React.useState(dayjs('2022-04-17T15:30'));
    const [selectedValue, setSelectedValue] = React.useState('option1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const onSubmit = async (values) => {
        try {
            const { data } = await apiClient().post('/user', values);
            dispatch(addUser(data.user));
            toast.success(data.message);
            handleEvent();
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
    };
    return (
        <>
            <MainCard title="Shift">
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
                                        <FormInput name="name" type="name" variant="standard" />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-from" required content="From" />
                                    </FormLabelGrid>
                                    {/* <FormInputGrid>
                                        <FormInput name="startTime" type="time" variant="standard" />
                                    </FormInputGrid> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker
                                                label="Controlled picker"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-to" required content="To" />
                                    </FormLabelGrid>
                                    {/* <FormInputGrid>
                                        <FormInput name="endTime" type="time" variant="standard" />
                                    </FormInputGrid> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker
                                                label="Controlled picker"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-margin" required content="Shift  Margin"></CustomFormLabel>
                                    </FormLabelGrid>
                                    <RadioGroup row defaultValue="false" required name="radio-buttons-group">
                                        <FormControlLabel value="true" control={<Radio />} label="Enable" />
                                        <FormControlLabel value="false" control={<Radio />} label="Disable" />
                                    </RadioGroup>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    {/* <FormInputGrid>
                                        <FormInput name="marginBefore" type="time" variant="standard" />
                                    </FormInputGrid> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker
                                                label="Controlled picker"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="margin-before" required content="hours before the shift starts" />
                                    </FormLabelGrid>

                                    {/* <FormInputGrid>
                                        <FormInput name="marginAfter" type="time" variant="standard" />
                                    </FormInputGrid> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker
                                                label="Controlled picker"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="margin-after" required content="hours after the shift ends" />
                                    </FormLabelGrid>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-company" content="Company Name"></CustomFormLabel>
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="company" type="name" variant="standard" />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-applicable" required content="Applicable for"></CustomFormLabel>
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput
                                            name="department"
                                            type="select"
                                            options={departmentOptions}
                                            variant="standard"
                                            searchAble
                                        />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>
                        </Grid>

                        <Box style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-start' }}>
                            <Button type="submit" variant="contained" color="secondary">
                                Save
                            </Button>
                        </Box>
                    </form>
                </FormProvider>
            </MainCard>
        </>
    );
};

export default EmployeeModel;
