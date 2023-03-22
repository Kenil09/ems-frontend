import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import Button from 'react-bootstrap/Button';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Button, Grid, Typography } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
export default function Calender() {
    // const events = [{ title: 'Meeting', start: new Date() }];
    // const [ss, setSS] = useState(0);
    // const [mm, setMM] = useState(0);
    // const [hh, setHH] = useState(0);
    // const handleChange = (event: SelectChangeEvent) => {
    //     {event}
    // };
    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    }
    return <div></div>;
}
