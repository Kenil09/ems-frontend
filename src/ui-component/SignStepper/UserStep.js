import React from 'react';

import {
    FormControl,
    Box,
    Modal,
    Typography,
    IconButton,
    Grid,
    TextField,
    Button,
    Paper,
    Link,
    Stack,
    InputAdornment
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Iconify from 'ui-component/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { addCacheData } from 'store/SignUpSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};
const validationSchema = yup.object({
    firstName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('firstName is required'),
    lastName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('lastName is required'),
    email: yup.string('Enter the email').email('Please enter valid email').required('Email is required'),
    password: yup.string('Enter the password').min(6, 'password length must be 6 or more').required('Password is required')
});
export const UserStep = ({ type, setActiveStep }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const SignUpCache = useSelector(({ SignUpUser }) => SignUpUser.SignUpCache);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstName: SignUpCache?.User?.firstName || '',
            lastName: SignUpCache?.User?.lastName || '',
            email: SignUpCache?.User?.email || '',
            password: SignUpCache?.User?.password || ''
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            dispatch(addCacheData({ ...formik.values, type }));
            setActiveStep(1);
        }
    });
    return (
        <form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="firstName"
                            defaultValue={SignUpCache?.User?.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            label="FirstName"
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="lastName"
                            defaultValue={SignUpCache?.User?.lastName}
                            type="string"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            label="LastName"
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            label="Email address"
                            id="email"
                            type="text"
                            name="email"
                            defaultValue={SignUpCache?.User?.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            defaultValue={SignUpCache?.User?.password}
                            type={showPassword ? 'text' : 'password'}
                            style={{ fontWeight: 'bolder' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            placeholder="Enter the password"
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    variant="contained"
                >
                    Next
                </Button>
            </Box>
        </form>
    );
};
