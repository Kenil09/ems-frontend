import { Grid, FormLabel, TextField } from '@mui/material';
import FormatDate from './FormatDate';
import PropTypes from 'prop-types';

const RecordData = ({ data }) => (
    <>
        <Grid item xs={4} container direction="row">
            <Grid item xs={4}>
                <FormLabel id="label-name">Created By</FormLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField name="createdBy" value={`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`} variant="standard" />
            </Grid>
        </Grid>
        <Grid item xs={4} container direction="row">
            <Grid item xs={4}>
                <FormLabel id="label-name">Created At</FormLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField name="createdAt" value={FormatDate(data?.createdAt)} variant="standard" />
            </Grid>
        </Grid>
        <Grid item xs={4} container direction="row"></Grid>
        <Grid item xs={4} container direction="row">
            <Grid item xs={4}>
                <FormLabel id="label-name">Updated By</FormLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    name="updatedBy"
                    value={
                        data?.updatedBy
                            ? `${data?.updatedBy?.firstName} ${data?.updatedBy?.lastName}`
                            : `${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`
                    }
                    variant="standard"
                />
            </Grid>
        </Grid>
        <Grid item xs={4} container direction="row">
            <Grid item xs={4}>
                <FormLabel id="label-name">Updated At</FormLabel>
            </Grid>
            <Grid item xs={8}>
                <TextField name="createdAt" value={FormatDate(data?.updatedAt)} variant="standard" />
            </Grid>
        </Grid>
    </>
);

export default RecordData;

RecordData.propTypes = {
    data: PropTypes.object.isRequired
};
