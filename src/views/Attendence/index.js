import { Grid, Button, Drawer, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import Profile from 'ui-component/Profile';
import UserSelect from 'ui-component/Form/UserSelect';
import apiClient from 'service/service';
import toast from 'react-hot-toast';
import AttendenceModal from './AttendenceModal';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';

function renderEventContent(eventInfo) {
    return (
        <>
            <Typography fontSize={'1rem'} fontWeight={900} marginTop={'30%'} textAlign="center" color="black">
                {eventInfo.event.title}
            </Typography>
            {eventInfo?.event?.extendedProps?.type === 'attended' && (
                <Typography fontWeight={900} textAlign="center" color="black">
                    Attended Hour: {eventInfo?.event?.extendedProps?.attendedHour}
                </Typography>
            )}
            {eventInfo?.event?.extendedProps?.type === 'leave' && (
                <Typography
                    sx={{ width: '10em', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                    fontWeight={900}
                    marginLeft={1}
                    textAlign="center"
                    color="black"
                >
                    {eventInfo?.event?.extendedProps?.leaveReason}
                </Typography>
            )}
        </>
    );
}

const Attendence = () => {
    const calendarRef = useRef(null);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState('');
    const [backGroudEvents, setBackGroudEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const year = dayjs().year();
        if (user && currentMonth > 0) {
            getMonthAttendences(currentMonth, year, user);
        }
    }, [user, currentMonth]);

    const getMonthAttendences = async (month, year, user) => {
        try {
            const { data } = await apiClient().post('/attendence/getMonthAttendence', {
                month,
                year,
                userId: user
            });
            setBackGroudEvents(data?.month);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleEvent = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setShow(open);
    };

    const handleDateSelect = (event) => {
        setSelectedDate(event.date);
        setShow(true);
    };

    const handleMonthChange = (event) => {
        setCurrentMonth(new Date(event.view.currentStart).getMonth() + 1);
    };
    return (
        <MainCard title="Attendence">
            <Grid display="flex" justifyContent="space-between" container borderRadius="10px">
                <Grid item xs={3}>
                    <UserSelect user={user} setUser={setUser} profileSize={3} searchAble={true} />
                </Grid>
            </Grid>
            <Grid style={{ width: '100%', height: '70%' }}>
                {backGroudEvents && (
                    <FullCalendar
                        plugins={[daygridPlugin, interactionPlugin]}
                        headerToolbar={{
                            right: 'prev,next today',
                            center: 'title',
                            left: ''
                        }}
                        initialView="dayGridMonth"
                        eventContent={renderEventContent}
                        events={backGroudEvents}
                        editable={true}
                        // selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        datesSet={handleMonthChange}
                        // select={handleDateSelect}
                        dateClick={handleDateSelect}
                        ref={calendarRef}
                    />
                )}
            </Grid>
            <Drawer anchor="right" open={show} onClose={handleEvent(false)}>
                <Grid sx={{ width: window.innerWidth / 2 }} container>
                    <AttendenceModal date={selectedDate} closeModal={setShow} />
                </Grid>
            </Drawer>
        </MainCard>
    );
};

export default Attendence;
