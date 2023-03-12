import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// @mui
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import { Stack, IconButton, InputAdornment, Typography, Grid } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import FormInput from 'ui-component/Form/FormInput';
import { LoadingButton } from '@mui/lab';

import Iconify from 'ui-component/Iconify';

function RegisterOTP() {
    const [showPassword, setShowPassword] = useState(false);
    const { token } = useParams();
    let email;
    const navigate = useNavigate();
    if (token) {
        const userData = jwtDecode(token);
        email = userData.email;
    }
    const RegisterSchema = Yup.object().shape({
        // email: Yup.string('Enter the email').email('Please enter valid email').required('Email is required'),
        password: Yup.string('Enter the password').min(6, 'password length must be 6 or more').required('Password is required'),
        securityCode: Yup.string('Enter the securityCode').required('Enter OTP')
    });
    console.log(email, 'email');
    const defaultValues = {
        email: email || '',
        password: '',
        securityCode: ''
    };
    console.log(defaultValues, 'defaultValues');
    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues
    });
    const {
        handleSubmit,
        setValue,
        formState: { isSubmitting, errors }
    } = methods;

    const Submit = async (values) => {
        const newPayload = { email: email, password: values.password, securityCode: values.securityCode };
        console.log(values);
        try {
            const data = await axios.post('http://localhost:3001/user/register', newPayload);
            toast.success('User registerd successfully');
            navigate('/');
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message);
        }
    };
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper sx={{ innerWidth: 200 }}>
                                <Typography variant="h1" style={{ textAlign: 'center', color: '#673ab7' }} gutterBottom>
                                    Register Yourself Here
                                </Typography>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <form onSubmit={methods.handleSubmit(Submit)}>
                                            <Stack spacing={4}>
                                                <FormInput name="email" label="Email" type={'text'} defaultValue={email} disabled />
                                                <FormInput name="password" label="Password" type={'password'} />
                                                <div className="custom-styles">
                                                    <ReactInputVerificationCode
                                                        length={6}
                                                        type="text"
                                                        style={{ border: 'blue' }}
                                                        onChange={(e) => {
                                                            const securityCode = e.split('·')[0];
                                                            setValue('securityCode', securityCode);
                                                        }}
                                                    />
                                                    {errors?.securityCode?.message && (
                                                        <span style={{ color: 'red', paddingTop: '5px' }}>Enter Valid OTP</span>
                                                    )}
                                                </div>
                                                {errors?.securityCode?.message ? (
                                                    <LoadingButton
                                                        style={{ marginTop: '10px' }}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        loading={isSubmitting}
                                                    >
                                                        Register
                                                    </LoadingButton>
                                                ) : (
                                                    <LoadingButton
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        loading={isSubmitting}
                                                    >
                                                        Register
                                                    </LoadingButton>
                                                )}
                                            </Stack>
                                        </form>
                                    </FormProvider>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
}
export default RegisterOTP;
