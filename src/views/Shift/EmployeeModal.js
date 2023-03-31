import { Grid, Box, Button, TextField, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import * as yup from 'yup';
import React from 'react';
import apiClient from 'service/service';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormInput from 'ui-component/Form/FormInput';

import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { FormComponentGrid, FormRowGrid, FormLabelGrid, FormInputGrid } from 'ui-component/Grid/Form/CustomGrid';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';

import { getDepartmentOptions } from 'views/utilities/FormOptions';
import moment from 'moment';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useState } from 'react';

const EmployeeModel = () => {
    const dispatch = useDispatch();
    const departmentOptions = getDepartmentOptions(useSelector(({ department }) => department.data));

    const validationSchema = yup
        .object({
            name: yup.string('Enter the Shift name').required('Shift name is required'),
            startTime: yup.string().required('startTime  cannot be empty')
            // endTime: yup
            //     .string()
            //     .required('endTime  cannot be empty')
            //     .test('is-greater', 'endTime  should be greater', function (value) {
            //         const { startTime } = this.parent;
            //         return moment(value, 'HH:mm').isSameOrAfter(moment(startTime, 'HH:mm'));
            //     }),
            // applicableDepartments: yup.string('Enter the department').required('Please Select Department')
        })
        .required();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            startTime: ''
        },
        mode: 'onChange'
    });

    const { setValue, value } = methods;
    const [selectedValue, setSelectedValue] = React.useState('option1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    // const onSubmit = async (values) => {
    //     try {
    //         const { data } = await apiClient().post('/user', values);
    //         dispatch(addUser(data.user));
    //         toast.success(data.message);
    //         handleEvent();
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error?.data?.message);
    //     }
    // };

    // const date = new Date();
    // date.setHours(12);
    // date.setMinutes(30);
    // date.setSeconds(0);
    // date.setMilliseconds(0);
    // const hour = date.getHours();

    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeChange = (newTime) => {
        setSelectedTime(dayjs(newTime).format('HH:mm'));
        //setSelectedTime(newTime.target.value, 'newValue');
        //setSelectedTime(dayjs(newTime).format('HH::mm'));
        console.log(dayjs(newTime).format('HH:mm'));
    };
    //const formattedTime = selectedTime ? moment(selectedTime.$d).format('HH:mm') : '';

    //console.log(newTime);

    // console.log(methods.formState.errors, 'DATA');
    console.log(methods.formState.va, 'value');

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <MainCard title="Add Shift">
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

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker name="startTime" format={'HH:mm'} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormComponentGrid>
                            </FormRowGrid>
                            {/* 
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-to" required content="To" />
                                    </FormLabelGrid>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker name="endTime" value={value} onChange={(newValue) => setValue(newValue)} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-margin" required content="Shift  Margin"></CustomFormLabel>
                                    </FormLabelGrid>
                                    <RadioGroup row defaultValue="false" required name="margin">
                                        <FormControlLabel value="true" control={<Radio />} label="Enable" />
                                        <FormControlLabel value="false" control={<Radio />} label="Disable" />
                                    </RadioGroup>
                                </FormComponentGrid>
                            </FormRowGrid>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker name="marginBefore" value={value} onChange={(newValue) => setValue(newValue)} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="margin-before" required content="hours before the shift starts" />
                                    </FormLabelGrid>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker name="marginAfter" value={value} onChange={(newValue) => setValue(newValue)} />
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
                                            name="applicableDepartments"
                                            type="select"
                                            options={departmentOptions}
                                            variant="standard"
                                            searchAble
                                        />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid> */}
                        </Grid>
                        {/* <Grid container rowSpacing={5}>
                            <Grid item xs={12} md={12}>
                                <FormRowGrid>
                                    <CustomFormHeader content="Shift Information" />
                                </FormRowGrid>
                            </Grid>
                            <Grid item xs={12} md={12}>
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
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormRowGrid>
                                    <FormComponentGrid>
                                        <FormLabelGrid>
                                            <CustomFormLabel id="label-from" required content="From" />
                                        </FormLabelGrid>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                <TimePicker name="startTime" value={value} onChange={(newValue) => setValue(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </FormComponentGrid>
                                </FormRowGrid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormRowGrid>
                                    <FormComponentGrid>
                                        <FormLabelGrid>
                                            <CustomFormLabel id="label-to" required content="To" />
                                        </FormLabelGrid>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                <TimePicker name="endTime" value={value} onChange={(newValue) => setValue(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </FormComponentGrid>
                                </FormRowGrid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormRowGrid>
                                    <FormComponentGrid>
                                        <FormLabelGrid>
                                            <CustomFormLabel id="label-margin" required content="Shift  Margin"></CustomFormLabel>
                                        </FormLabelGrid>
                                        <RadioGroup row defaultValue="false" required name="margin">
                                            <FormControlLabel value="true" control={<Radio />} label="Enable" />
                                            <FormControlLabel value="false" control={<Radio />} label="Disable" />
                                        </RadioGroup>
                                    </FormComponentGrid>
                                </FormRowGrid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormRowGrid>
                                    <FormComponentGrid>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                <TimePicker name="marginBefore" value={value} onChange={(newValue) => setValue(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <FormLabelGrid>
                                            <CustomFormLabel id="margin-before" required content="hours before the shift starts" />
                                        </FormLabelGrid>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                <TimePicker name="marginAfter" value={value} onChange={(newValue) => setValue(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <FormLabelGrid>
                                            <CustomFormLabel id="margin-after" required content="hours after the shift ends" />
                                        </FormLabelGrid>
                                    </FormComponentGrid>
                                </FormRowGrid>
                            </Grid>
                            <Grid item xs={12} md={12}>
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
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormRowGrid>
                                    <FormComponentGrid>
                                        <FormLabelGrid>
                                            <CustomFormLabel id="label-applicable" required content="Applicable for"></CustomFormLabel>
                                        </FormLabelGrid>
                                        <FormInputGrid>
                                            <FormInput
                                                name="applicableDepartments"
                                                type="select"
                                                options={departmentOptions}
                                                variant="standard"
                                                searchAble
                                            />
                                        </FormInputGrid>
                                    </FormComponentGrid>
                                </FormRowGrid>
                            </Grid>
                        </Grid> */}
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
