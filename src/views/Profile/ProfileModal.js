import PropTypes from 'prop-types';
import axios from 'axios';
// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

//profilepage
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import img1 from '../../assets/images/home/img1.png';
import { Typography, Button, IconButton, Box, Paper, Grid, Hidden } from '@mui/material';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { FormComponentGrid, FormRowGrid, FormLabelGrid, FormInputGrid } from 'ui-component/Grid/Form/CustomGrid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import FormInput from 'ui-component/Form/FormInput';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { GenderOptions, MaritalStatusOptions } from 'views/utilities/FormOptions';
import { useSelector, useDispatch } from 'react-redux';
import Profile from 'ui-component/Profile';
// D:\react\ems-frontend\src\ui-component\Profile\index.js
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| Profile Page ||============================== //

const ProfileModal = ({ isLoading }) => {
    // const [isEditMode, setIsEditMode] = useState(false);

    // const handleEvent = () => {
    //     setShow(!show);
    //     // setIsEditMode();
    // };

    const [showButton, setShowButton] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const user = useSelector((state) => state.user.details);
    const navigate = useNavigate();
    const handleShowButton = () => {
        setShowButton(true);
        setHideButton(false);
        setDisabled(false);
    };

    const handleHideButton = () => {
        setHideButton(true);
        setShowButton(false);
        setDisabled(true);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('files', file);
        console.log(formData, 'formData');
        axios
            .post(`http://localhost:3001/user/updateProfilePicture/${user._id}`, formData)
            .then((response) => {
                // handle the response from the server
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // const [show, setShow] = useState(false);
    const theme = useTheme();
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            birthDate: '',
            gender: '',
            maritalStatus: ''
        },
        mode: 'onChange'
    });
    const { setValue } = methods;

    useEffect(() => {
        if (user) {
            const options = ['firstName', 'lastName', 'nickName', 'email', 'birthDate', 'gender', 'maritalStatus'];
            Object.keys(user).forEach((key) => {
                if (options.includes(key)) {
                    setValue(key, user[key]);
                }
            });
        } else {
            setValue('joiningDate', dayjs().toISOString());
        }
    }, []);

    return (
        <>
            <MainCard title="Profile" backIcon handleBackEvent={() => navigate(-1)}>
                <CardWrapper border={false} sx={{ p: '25px' }} content={false}>
                    <Stack direction="row" spacing={3}>
                        <IconButton color="primary" aria-label="upload picture" component="label" style={{ marginTop: '-10px' }}>
                            <Profile src={user?.profilePicture} alt="profile" />
                            <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
                        </IconButton>
                        <Typography variant="h3">
                            {user.firstName}
                            <br />
                            {user.lastName}
                            <Typography sx={{ marginTop: '10px' }}>{user.email}</Typography>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {hideButton && (
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ float: 'right', height: '50px ', width: '90px', color: '#fff' }}
                                onClick={handleShowButton}
                            >
                                Edit
                            </Button>
                        )}
                    </Stack>
                </CardWrapper>
                <FormProvider {...methods}>
                    <form>
                        <Grid container direction="column" sx={{ p: '25px' }} spacing={5}>
                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-name" required content="First Name" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="firstName" type="firstName" variant="standard" disabled={disabled} />
                                    </FormInputGrid>
                                </FormComponentGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-last-name" required content="Last Name" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="lastName" type="lastName" variant="standard" disabled={disabled} />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>

                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-last-name" required content="Nick Name" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="nickName" type="nickName" variant="standard" disabled={disabled} />
                                    </FormInputGrid>
                                </FormComponentGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-email-name" required content="Email" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="email" type="email" variant="standard" disabled={disabled} />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>

                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-birthdate" content="Date of birth" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="birthDate" type="date" disabled={disabled} />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>

                            <FormRowGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-gender" content="Gender" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput
                                            name="gender"
                                            type="select"
                                            options={GenderOptions}
                                            variant="standard"
                                            disabled={disabled}
                                        />
                                    </FormInputGrid>
                                </FormComponentGrid>
                                <FormComponentGrid>
                                    <FormLabelGrid>
                                        <CustomFormLabel id="label-marital-status" content="Marital Status" />
                                    </FormLabelGrid>
                                    <FormInputGrid>
                                        <FormInput name="maritalStatus" type="select" options={MaritalStatusOptions} variant="standard" />
                                    </FormInputGrid>
                                </FormComponentGrid>
                            </FormRowGrid>
                        </Grid>
                        <Box style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-start' }}>
                            {showButton && (
                                <Button type="submit" variant="contained" color="secondary" onClick={handleHideButton}>
                                    Save
                                </Button>
                            )}
                            {showButton && (
                                <Button
                                    type="reset"
                                    variant="contained"
                                    color="inherit"
                                    sx={{ marginLeft: '20px' }}
                                    onClick={handleHideButton}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Box>
                    </form>
                </FormProvider>
            </MainCard>
        </>
    );
};

ProfileModal.propTypes = {
    isLoading: PropTypes.bool
};

export default ProfileModal;
