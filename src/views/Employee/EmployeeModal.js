import { Grid, Box, Button } from '@mui/material';
import * as yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import FormInput from 'ui-component/Form/FormInput';
import { useEffect } from 'react';
import { addUser, updateUser } from 'store/usersSlice';
import apiClient from 'service/service';
import SystemFields from 'views/utilities/SystemFields';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { FormComponentGrid, FormRowGrid, FormLabelGrid, FormInputGrid } from 'ui-component/Grid/Form/CustomGrid';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';
import {
    Roles,
    EmployeeTyes,
    getDepartmentOptions,
    getDesignationOptions,
    getUserOptions,
    GenderOptions,
    MaritalStatusOptions
} from 'views/utilities/FormOptions';
import EducationDetails from './EducationDetailsForm';
import WorkExperienceForm from './WorkExperienceForm';
import dayjs from 'dayjs';

const validationSchema = yup
    .object({
        firstName: yup.string('Enter the first name').required('First name is required'),
        lastName: yup.string('Enter the last name').required('Last name is required'),
        email: yup.string('Enter the email').required('Email is required'),
        nickName: yup.string().nullable().notRequired(),
        department: yup
            .string('Enter the department')
            .nullable()
            .notRequired()
            .when('role', {
                is: 'teamMember',
                then: yup.string('Enter the department').required()
            })
            .when('role', {
                is: 'teamIncharge',
                then: yup.string('Enter the department').required()
            })
            .when('role', {
                is: 'manager',
                then: yup.string('Enter the department').required()
            }),
        role: yup
            .string('Enter the role')
            .oneOf(['admin', 'teamMember', 'teamIncharge', 'manager'], 'Role is required')
            .required('Role is required'),
        designation: yup
            .string('Enter the designation')
            .nullable()
            .notRequired()
            .when('role', {
                is: 'teamMember',
                then: yup.string('Enter the department').required()
            })
            .when('role', {
                is: 'teamIncharge',
                then: yup.string('Enter the department').required()
            })
            .when('role', {
                is: 'manager',
                then: yup.string('Enter the department').required()
            }),
        location: yup.string().nullable().notRequired(),
        employeeType: yup
            .string()
            .oneOf(['permanent', 'onContract', 'temporary', 'trainee', ''], 'Enter the Employee Type')
            .nullable()
            .notRequired(),
        joiningDate: yup.string().nullable().notRequired(),
        reportingManager: yup
            .string()
            .notRequired()
            .when('role', {
                is: 'teamMember',
                then: yup.string('Enter the Reporting Manager').required('Reporting manager is required')
            })
            .when('role', {
                is: 'teamIncharge',
                then: yup.string('Enter the Reporting Manager').required('Reporting manager is required')
            }),
        birthDate: yup.string().nullable().notRequired(),
        gender: yup.string(),
        maritalStatus: yup.string(),
        aboutMeInfo: yup.string(),
        educationDetails: yup.array().of(
            yup
                .object()
                .shape({
                    university: yup.string().required('Enter university name'),
                    degree: yup.string().required('Enter degree'),
                    dateOfCompletion: yup.date().typeError('Enter valid date').required('Enter date of cpmpletion')
                })
                .required()
        ),
        workExperience: yup.array().of(
            yup
                .object({
                    previousCompany: yup.string().required('Enter previous company detail'),
                    jobTitle: yup.string().required('Enter the job title'),
                    fromDate: yup.string().typeError('Enter valid date').required('Enter from date'),
                    toDate: yup.string().typeError('Enter valid date').required('Enter to date'),
                    jobDescription: yup.string().required('Enter Job details')
                })
                .required()
        )
    })
    .required();

const EmployeeModel = ({ handleEvent, modalTitle, isEditMode }) => {
    const dispatch = useDispatch();

    const userOptions = getUserOptions(useSelector(({ users }) => users.data));
    const departmentOptions = getDepartmentOptions(useSelector(({ department }) => department.data));
    const designationOptions = getDesignationOptions(useSelector(({ designation }) => designation.data));
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            department: '',
            role: '',
            designation: '',
            employeeType: '',
            location: '',
            joiningDate: null,
            reportingManager: '',
            birthDate: '',
            gender: '',
            maritalStatus: '',
            aboutMeInfo: '',
            educationDetails: [],
            workExperience: []
            // educationDetails: [{ university: '', degree: '', dateOfCompletion: null }],
            // workExperience: [{ previousCompany: '', jobTitle: '', fromDate: null, toDate: null, jobDescription: '' }]
        },
        mode: 'onChange'
    });

    const { setValue } = methods;

    useEffect(() => {
        if (isEditMode) {
            const options = [
                'firstName',
                'lastName',
                'nickName',
                'email',
                'role',
                'employeeType',
                'location',
                'joiningDate',
                'birthDate',
                'gender',
                'maritalStatus',
                'aboutMeInfo',
                'educationDetails',
                'workExperience'
            ];
            setValue('department', isEditMode['department']?._id);
            setValue('designation', isEditMode['designation']?._id);
            setValue('reportingManager', isEditMode['reportingManager']?._id);
            Object.keys(isEditMode).forEach((key) => {
                if (options.includes(key)) {
                    setValue(key, isEditMode[key]);
                }
            });
        } else {
            setValue('joiningDate', dayjs().toISOString());
        }
    }, []);

    const filterData = (values) => {
        const data = values;
        const keys = Object.keys(values);
        keys.forEach((key) => {
            if (!data[key]) {
                delete data[key];
            }
            if (['educationDetails', 'workExperience'].includes(key)) {
                if (!data[key].length) {
                    delete data[key];
                }
            }
        });
        return data;
    };

    const onSubmit = async (values) => {
        const payload = filterData(values);
        try {
            if (isEditMode) {
                const { data } = await apiClient().put(`/user/${isEditMode?._id}`, payload);
                dispatch(updateUser(data.user));
                toast.success(data.message);
            } else {
                const { data } = await apiClient().post('/user', payload);
                dispatch(addUser(data.user));
                toast.success(data.message);
            }
            handleEvent();
        } catch (error) {
            console.log(error);
            toast.error(error?.response.data?.message);
        }
    };

    return (
        <MainCard title={modalTitle} backIcon handleBackEvent={handleEvent}>
            {/* <Box style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" color="purple">
                    Employee Details
                </Typography>
            </Box> */}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <FormRowGrid>
                            <CustomFormHeader content="Basic Information" />
                        </FormRowGrid>

                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-name" required content="First Name" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="firstName" type="firstName" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-nick-name" content="Nick Name" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="nickName" type="nickName" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-last-name" required content="Last Name" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="lastName" type="lastName" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-email-name" required content="Email" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="email" type="email" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <CustomFormHeader content="Work Information" />
                        </FormRowGrid>

                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-department" required content="Department" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="department" type="select" options={departmentOptions} variant="standard" searchAble />
                                </FormInputGrid>
                            </FormComponentGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-role" required content="Role" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="role" type="select" variant="standard" options={Roles} />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-designation" content="Designation" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput
                                        name="designation"
                                        type="select"
                                        variant={'standard'}
                                        options={designationOptions}
                                        searchAble
                                    />
                                </FormInputGrid>
                            </FormComponentGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-employeeType" content="Employee Type" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="employeeType" type="select" options={EmployeeTyes} variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-location" content="Location" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="location" type="location" variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-dateOfJoining" content="Date of Joining" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="joiningDate" type="date" disablePast variant="standard" disableFuture={false} />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <CustomFormHeader content="Hierarchy Information" />
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-reportingManager" content="Reporting Manager" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="reportingManager" type="select" options={userOptions} variant="standard" searchAble />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <CustomFormHeader content="Personal Details" />
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-birthdate" content="Date of birth" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="birthDate" type="date" disableFuture />
                                </FormInputGrid>
                            </FormComponentGrid>
                            {/* <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-age" content="Age" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormControl fullWidth>
                                        <TextField name="age" value={dayjs()} variant="standard" size="medium" />
                                    </FormControl>
                                </FormInputGrid>
                            </FormComponentGrid> */}
                        </FormRowGrid>
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-gender" content="Gender" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="gender" type="select" options={GenderOptions} variant="standard" />
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
                        <FormRowGrid>
                            <FormComponentGrid>
                                <FormLabelGrid>
                                    <CustomFormLabel id="label-aboutMe" content="About me" />
                                </FormLabelGrid>
                                <FormInputGrid>
                                    <FormInput name="aboutMeInfo" multiline variant="standard" />
                                </FormInputGrid>
                            </FormComponentGrid>
                        </FormRowGrid>
                        <FormRowGrid>
                            <CustomFormHeader content="Education Details" />
                        </FormRowGrid>
                        <FormRowGrid>
                            <EducationDetails />
                        </FormRowGrid>
                        <FormRowGrid>
                            <CustomFormHeader content="Work Experience" />
                        </FormRowGrid>
                        <FormRowGrid>
                            <WorkExperienceForm />
                        </FormRowGrid>
                        {isEditMode && (
                            <>
                                <FormRowGrid>
                                    <CustomFormHeader content="System Fields" />
                                </FormRowGrid>
                                <SystemFields data={isEditMode} />
                            </>
                        )}
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

export default EmployeeModel;
