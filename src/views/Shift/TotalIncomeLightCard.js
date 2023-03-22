import PropTypes from 'prop-types';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Button, Divider, Grid, Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LiveClockUpdate from './LiveClockUpdate';
import apiClient from 'service/service';
// assets
const theme1 = createTheme({
    palette: {
        whitec: {
            main: '#F3F1F5'
        },
        blackc: {
            main: '#212121'
        },
        purc: {
            main: '#673ab7'
        }
    }
});
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

const TotalIncomeLightCard = ({ isLoading }) => {
    const user = useSelector((state) => state.user);
    // console.log(user.details._id, '=-=-=-');
    const [da, setDa] = useState('');
    const [clockIn, setClockIn] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [right, setRight] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getApi = async () => {
            const { data } = await apiClient().get(`/attendence/userAvailableStatus/${user.details._id}`);
            console.log(data, 'data on first callling');
            setClockIn(data.checkIn);
            // console.log(data, clockIn, '-----', data.checkIn);
        };
        getApi();
    }, []);
    // const EventItem = ({ info }) => {
    //     const { event } = info;
    //     return (
    //         <div>
    //             <p>{event.title}</p>
    //         </div>
    //     );
    // };
    console.log(clockIn, 'CLOCKIN----');
    const onClockInOut = async () => {
        try {
            if (clockIn) {
                console.log('call1');
                const { data } = await apiClient().get('/attendence/checkout');
                setClockIn(false);
                console.log(data, ':::::jadoo');
            } else {
                console.log('put1');
                const { data } = await apiClient().get('/attendence/checkin');
                console.log(data, ':::::jadoo');
                if (data.message === 'User check in successfully') {
                    setClockIn(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleSelect = (info) => {
        console.log('handleselect');
        const { start, end } = info;
        // const eventNamePrompt = prompt('Enter, event name');
        setRight(true);
        let date =
            start.getDate().toString().padStart(2, '0') +
            '-' +
            parseInt(start.getMonth() + 1)
                .toString()
                .padStart(2, '0') +
            '-' +
            start.getFullYear();
        setDa(date);
    };
    const toggleDrawer = (open) => (event) => {
        console.log('toggle drawer', event.type);
        if (event.type === 'click' && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        console.log(event.type);
        setRight(open);
    };
    const list = (right) => (
        <>
            <Box
                sx={{
                    width: 500,
                    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
                    height: '100%',
                    bgcolor: '#fff'
                }}
                role="presentation"
                // onClick={toggleDrawer(false)}
                // onKeyDown={toggleDrawer(false)}
            >
                <Grid
                    sx={{
                        borderTopRightRadius: '10px',
                        borderEndEndRadius: '10px',
                        my: 2,
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingRight: 3,
                        paddingLeft: 5,
                        py: 1,
                        marginBottom: 3,
                        background: '#673ab7',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
                    }}
                    container
                >
                    <Grid item>
                        <Typography sx={{ color: 'white' }} fontWeight={'500'} fontSize="1.3rem">
                            {da}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button color="whitec" onClick={toggleDrawer(false)}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
                {!showForm && (
                    <Box
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
                            bgcolor: '#eeeeee',
                            px: 5,
                            py: 1,
                            mx: 2,
                            my: 1,
                            borderRadius: '10px'
                        }}
                    >
                        <Grid container sx={{ display: 'flex' }}>
                            <Typography sx={{ m: 2 }}>09:45 Am</Typography>
                            <Typography sx={{ m: 2 }}>06:15 Am</Typography>
                        </Grid>
                        <Divider />
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button>
                                <DeleteForeverIcon color="blackc" />
                            </Button>
                            <Button onClick={() => setShowForm(!showForm)}>
                                <EditIcon color="blackc" />
                            </Button>
                        </Grid>
                    </Box>
                )}
                {showForm && (
                    <Box
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
                            bgcolor: '#eeeeee',
                            px: 5,
                            py: 1,
                            mx: 2,
                            my: 1,
                            borderRadius: '10px'
                        }}
                    >
                        <Grid container sx={{ display: 'flex' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Clock In" />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Clock Out" />
                                </DemoContainer>
                            </LocalizationProvider>
                            {/* <Typography sx={{ m: 2 }}>06:15 Am</Typography> */}
                        </Grid>
                        <br />
                        <Divider />
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button onClick={() => setShowForm(!showForm)}>
                                <EditIcon color="blackc" />
                            </Button>
                        </Grid>
                    </Box>
                )}
                {showEntryForm && (
                    <Box
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
                            bgcolor: '#eeeeee',
                            px: 5,
                            py: 1,
                            mx: 2,
                            my: 1,
                            borderRadius: '10px'
                        }}
                    >
                        <Grid container sx={{ display: 'flex' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Clock In" />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Clock Out" />
                                </DemoContainer>
                            </LocalizationProvider>
                            {/* <Typography sx={{ m: 2 }}>06:15 Am</Typography> */}
                        </Grid>
                        <br />
                        <Divider />
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button color="blackc" onClick={() => setShowForm(!showForm)}>
                                + ADD
                                {/* <EditIcon color="blackc" /> */}
                            </Button>
                        </Grid>
                    </Box>
                )}
                <Grid sx={{ display: 'flex', justifyContent: 'end', my: 2, px: 3 }} container>
                    <Grid item>
                        <Button variant="contained" color="purc" sx={{ color: 'white' }} onClick={() => setShowEntryForm(!showEntryForm)}>
                            Add Entry +
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    }
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} sx={{ p: '25px' }} content={false}>
                    <>
                        <ThemeProvider theme={theme1}>
                            <Drawer anchor="right" open={right} onClose={toggleDrawer(false)}>
                                {list(right)}
                            </Drawer>
                        </ThemeProvider>
                        <Grid sx={{ display: 'flex', justifyContent: 'end', margin: '10px', padding: '10px' }}>
                            <Button color="secondary" variant="contained" size="large" sx={{ marginLeft: '10px' }} onClick={onClockInOut}>
                                <Typography fontSize={'1rem'}>
                                    {clockIn ? 'Clock-Out' : 'Clock-In'} <br /> <LiveClockUpdate />
                                </Typography>
                                <AccessAlarmIcon sx={{ marginLeft: '10px' }} />
                            </Button>
                        </Grid>
                        <FullCalendar
                            editable
                            selectable
                            events={events}
                            select={handleSelect}
                            headerToolbar={{
                                start: 'today prev next',
                                end: 'dayGridMonth dayGridWeek dayGridDay'
                            }}
                            eventContent={(info) => <EventItem info={info} />}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
                        />
                    </>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
