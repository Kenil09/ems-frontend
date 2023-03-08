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
import { useDispatch, useSelector } from 'react-redux';
import { addCacheData, deleteCacheData } from 'store/SignUpSlice';

const validationSchema = yup.object({
    name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('name is required'),
    address: yup.string().required('address is required'),
    city: yup.string().required('city is required'),
    state: yup.string().required('state is required'),
    zipcode: yup
        .string()
        .matches(/^[0-9]+$/, 'zip code should be number')
        .length(6, 'zip code length must be 6')
        .required('Zipcode is required')
});

export const CompanyStep = ({ setActiveStep, type, handleUser, handleClose, handleEvent }) => {
    const SignUpdata = useSelector(({ SignUpUser }) => SignUpUser.SignUpCache);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: SignUpdata?.Company?.name || '',
            address: SignUpdata?.Company?.address || '',
            city: SignUpdata?.Company?.city || '',
            state: SignUpdata?.Company?.state || '',
            zipcode: SignUpdata?.Company?.zipcode || ''
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            const data = { ...SignUpdata, Company: values };
            dispatch(addCacheData({ ...formik.values, type }));
            handleUser(data);
            handleEvent();
            setActiveStep(0);
        }
    });
    return (
        <div>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Company Name"
                                id="name"
                                defaultValue={SignUpdata?.Company?.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Address"
                                id="address"
                                defaultValue={SignUpdata?.Company?.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="city"
                                defaultValue={SignUpdata?.Company?.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                label="City"
                                placeholder="city"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="state"
                                defaultValue={SignUpdata?.Company?.state}
                                onChange={formik.handleChange}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                                label="State"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="zipcode"
                                defaultValue={SignUpdata?.Company?.zipcode}
                                type="string"
                                onChange={formik.handleChange}
                                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                                helperText={formik.touched.zipcode && formik.errors.zipcode}
                                label="Zipcode"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="Button"
                        onClick={(e) => {
                            setActiveStep(0);
                        }}
                        variant="text"
                        style={{ color: '#673ab7' }}
                    >
                        Back
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                        variant="contained"
                        style={{ backgroundColor: '#673ab7' }}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    );
};
