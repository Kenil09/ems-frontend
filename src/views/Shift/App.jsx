import { useState } from 'react'
import './App.css';
import FullCalendar from "@fullcalendar/react";
import Box from '@mui/material/Box';
import daygridPlugin from "@fullcalendar/daygrid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { shadows } from '@mui/system';

const theme = createTheme({
  palette: {
    whitec: {
      // Purple and green play nicely together.
      main: '#fafafa',
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: '#11cb5f',
    // },
  },
});


function App() {
  const [right, setRight] = useState(false);
  const [events, setEvents] = useState([]);
  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setRight(open);
  };
  const list = (right) => (
    <Box
      sx={{ width: 500, padding: '10px', height: '100%', bgcolor: '#ede7f6' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Grid sx={{ display: 'flex', justifyContent: 'end', my: 2, px: 3 }} container>
        <Grid item>
          <Button variant="contained" color='whitec'>Contained</Button>
        </Grid>
      </Grid>
      <Box sx={{ height: '80%', borderRadius: '15px', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', bgcolor: '#fff', p: 5 }}>

      </Box>
    </Box>
  );
  return (
    <ThemeProvider theme={theme}>

      <>
        <Button onClick={toggleDrawer(true)}>Right</Button>
        <Drawer
          anchor='right'
          open={right}
          onClose={toggleDrawer(false)}
        >
          {list(right)}
        </Drawer>

        <FullCalendar
          editable
          selectable
          events={events}
          select={handleSelect}
          headerToolbar={{
            start: "today prev next",
            end: "dayGridMonth dayGridWeek dayGridDay",
          }}
          eventContent={(info) => <EventItem info={info} />}
          plugins={[daygridPlugin, interactionPlugin]}
          views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        />
      </>
    </ThemeProvider>

  )
}

export default App
