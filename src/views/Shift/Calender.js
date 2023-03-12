import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import Button from 'react-bootstrap/Button';
import { Button, Grid, Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function Calender() {
    // const events = [{ title: 'Meeting', start: new Date() }];
    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    }
    return (
        <div>
            <Grid sx={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                <Button color="secondary" variant="contained" size="large" sx={{ marginLeft: '10px' }}>
                    <Typography fontSize={'1rem'}>
                        Clock-In <br /> 00:00:00
                    </Typography>
                    <AccessAlarmIcon sx={{ marginLeft: '10px' }} />
                </Button>
            </Grid>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                // weekends={false}
                // events={events}
                eventContent={renderEventContent}
            />
        </div>
    );
}
