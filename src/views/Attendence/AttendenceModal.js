import { Close } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import apiClient from 'service/service';

const AttendenceModal = ({ date, closeModal }) => {
    console.log('date', date);

    return (
        <>
            <Grid xs={12} display="flex" justifyContent="space-between">
                <Typography fontSize={'1.4rem'} fontWeight={700} marginTop={2} marginLeft={2} color="black">
                    {dayjs(date).format('ddd DD MMM YYYY')}
                </Typography>
                <IconButton onClick={() => closeModal(false)}>
                    <Close />
                </IconButton>
            </Grid>
            <hr style={{ height: '2px', background: 'black', padding: '0px 370px' }} />
        </>
    );
};

export default AttendenceModal;
