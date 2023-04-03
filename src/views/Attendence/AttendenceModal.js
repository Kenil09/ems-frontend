import { Close, Add, Delete } from '@mui/icons-material';
import { Button, Grid, IconButton, Typography, Paper, Stack } from '@mui/material';
import dayjs from 'dayjs';
import apiClient from 'service/service';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from 'ui-component/Form/FormInput';
import { FormInputGrid } from 'ui-component/Grid/Form/CustomGrid';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin: '10px',
    padding: '10px 0px',
    color: theme.palette.text.secondary
}));

const validationSchema = yup
    .object({
        checkIn: yup.string('Please enter Check In time').required('Check In time is required'),
        checkOut: yup.string('Please enter check out time').required('Check out time is required')
    })
    .required();

const initialValues = {
    checkIn: '',
    checkOut: ''
};

const formatEntry = (date, manual) => {
    return manual ? dayjs(date).subtract(dayjs(date).utcOffset(), 'minutes').format('HH:mm') : dayjs(date).format('HH:mm');
};

const AttendenceModal = ({ date, user, closeModal, currentMonth, getMonthAttendences }) => {
    const [entries, setEntries] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const currentUser = useSelector(({ user }) => user.details);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onChange'
    });

    const getUserEntries = async () => {
        try {
            const { data } = await apiClient().post('/attendence/getEntries', { userId: user, date });
            setEntries(data?.attendence);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const isAdmin = (user) => {
        return user?.role === 'admin' ? true : false;
    };

    useEffect(() => {
        getUserEntries();
    }, [user, date]);

    const toDate = (timeObj) => {
        const filterTimeString = (s) => {
            return s[2] + s[3] + s[5] + s[7] + s[8];
        };
        return Object.assign(
            ...Object.keys(timeObj).map((key) => {
                const time = filterTimeString(timeObj[key]).split(':');
                let attendedDate = dayjs(date).add(time[0], 'hours').add(time[1], 'minutes');
                return { [key]: attendedDate.toISOString() };
            })
        );
    };

    const onSubmit = async (values) => {
        const formattedValues = toDate(values);
        try {
            const { data } = await apiClient().post('/attendence/addEntry', { ...formattedValues, user });
            setShowAdd(false);
            getUserEntries();
            getMonthAttendences(currentMonth, dayjs().year(), user);
            toast.success(data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const formHeight = window.innerWidth / 2 - 40;

    const deleteEntry = async (id) => {
        console.log('got her', id);
        try {
            const { data } = await apiClient().delete(`/attendence/deleteEntry/${id}`);
            getUserEntries();
            getMonthAttendences(currentMonth, dayjs().year(), user);
            toast.success(data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            <Grid item xs={12} display="flex" justifyContent="space-between">
                <Typography fontSize={'1.4rem'} fontWeight={500} marginTop={2} marginLeft={2} color="black">
                    {dayjs(date).format('ddd DD MMM YYYY')}
                </Typography>
                <IconButton onClick={() => closeModal(false)}>
                    <Close />
                </IconButton>
            </Grid>
            <hr style={{ height: '2px', background: 'black', padding: '0px 370px' }} />
            {showAdd && (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="entry-add" style={{ width: `${formHeight}px` }}>
                            <div className="each-entry">
                                <CustomFormLabel content="Check In" id="label-checkIn" required />
                                <FormInput name="checkIn" type="time" variant="outlined" />
                            </div>
                            <div className="each-entry">
                                <CustomFormLabel content="Check Out" id="label-checkOut" required />
                                <FormInput name="checkOut" type="time" variant="outlined" />
                            </div>
                        </div>
                        <div className="entry-button-div">
                            <Button variant="text" color="secondary" onClick={() => setShowAdd(false)}>
                                cancel
                            </Button>
                            <Button variant="contained" type="submit" color="secondary">
                                Save
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            )}
            {!entries.length ? (
                <>
                    {isAdmin(currentUser) && (
                        <Grid item xs={12} sx={{ margin: '5px 0px' }} display="flex">
                            <Button
                                startIcon={<Add />}
                                fullWidth
                                onClick={() => setShowAdd(true)}
                                variant="outlined"
                                color="secondary"
                                sx={{ padding: '12px 0px', margin: '0px 20px' }}
                            >
                                Add Entry
                            </Button>
                        </Grid>
                    )}
                </>
            ) : (
                <Grid item xs={12} display="flex" flexDirection="column" margin={2} borderRadius={1} padding={2} bgcolor="#f3f3f8">
                    {entries.map((entry, index) => (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sx={{ backgroundColor: '#fff', margin: '10px' }}
                            justifyContent="space-around"
                            display="flex"
                            flexDirection="row"
                        >
                            <Typography sx={{ color: 'green' }} className="entryDate">
                                {formatEntry(entry.checkIn, entry?.manual)}
                            </Typography>
                            <Typography sx={{ color: 'red' }} className="entryDate">
                                {formatEntry(entry.checkOut, entry?.manual)}
                            </Typography>
                            {isAdmin(currentUser) && (
                                <IconButton color="secondary" onClick={() => deleteEntry(entry?._id)}>
                                    <Delete />
                                </IconButton>
                            )}
                        </Grid>
                    ))}
                    {isAdmin(currentUser) && (
                        <Grid item xs={12}>
                            <Button
                                startIcon={<Add />}
                                fullWidth
                                variant="text"
                                color="secondary"
                                onClick={() => setShowAdd(true)}
                                // sx={{ padding: '12px 0px', margin: '0px 20px' }}
                            >
                                Add Entry
                            </Button>
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};

export default AttendenceModal;