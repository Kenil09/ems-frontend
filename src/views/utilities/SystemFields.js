import { FormControl, TextField } from '@mui/material';
import FormatDate from './FormatDate';
import PropTypes from 'prop-types';
import CustomFormLabel from 'ui-component/Form/CustomFormLabel';
import { FormRowGrid, FormComponentGrid, FormLabelGrid, FormInputGrid } from 'ui-component/Grid/Form/CustomGrid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    resize: {
        fontSize: '1rem'
    }
}));

const SystemFields = ({ data }) => {
    const classes = useStyles();
    return (
        <>
            <FormRowGrid>
                <FormComponentGrid>
                    <FormLabelGrid>
                        <CustomFormLabel id="label-name" content="Created By" />
                    </FormLabelGrid>
                    <FormInputGrid>
                        <FormControl fullWidth>
                            <TextField
                                name="createdBy"
                                disabled
                                value={data?.createdBy ? `${data?.createdBy?.firstName} ${data?.createdBy?.lastName}` : ''}
                                InputProps={{
                                    classes: {
                                        input: classes.resize
                                    }
                                }}
                                variant="standard"
                            />
                        </FormControl>
                    </FormInputGrid>
                </FormComponentGrid>
                <FormComponentGrid>
                    <FormLabelGrid>
                        <CustomFormLabel id="label-name" content="Created At" />
                    </FormLabelGrid>
                    <FormInputGrid>
                        <FormControl fullWidth>
                            <TextField
                                name="createdAt"
                                InputProps={{
                                    classes: {
                                        input: classes.resize
                                    }
                                }}
                                disabled
                                value={FormatDate(data?.createdAt)}
                                variant="standard"
                            />
                        </FormControl>
                    </FormInputGrid>
                </FormComponentGrid>
            </FormRowGrid>
            <FormRowGrid>
                <FormComponentGrid>
                    <FormLabelGrid>
                        <CustomFormLabel id="label-name" content="Updated By" />
                    </FormLabelGrid>
                    <FormInputGrid>
                        <FormControl fullWidth>
                            <TextField
                                name="updatedBy"
                                InputProps={{
                                    classes: {
                                        input: classes.resize
                                    }
                                }}
                                value={data?.updatedBy ? `${data?.updatedBy?.firstName} ${data?.updatedBy?.lastName}` : ``}
                                variant="standard"
                                disabled
                            />
                        </FormControl>
                    </FormInputGrid>
                </FormComponentGrid>
                <FormComponentGrid>
                    <FormLabelGrid>
                        <CustomFormLabel id="label-name" content="Updated At" />
                    </FormLabelGrid>
                    <FormInputGrid>
                        <FormControl fullWidth>
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.resize
                                    }
                                }}
                                name="createdAt"
                                disabled
                                value={FormatDate(data?.updatedAt)}
                                variant="standard"
                            />
                        </FormControl>
                    </FormInputGrid>
                </FormComponentGrid>
            </FormRowGrid>
        </>
    );
};

export default SystemFields;

SystemFields.propTypes = {
    data: PropTypes.object.isRequired
};
