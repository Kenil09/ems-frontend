import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

const FormRowGrid = ({ children }) => (
    <Grid item xs={12} container>
        {children}
    </Grid>
);

const FormInputGrid = ({ children }) => (
    <Grid item xs={6}>
        {children}
    </Grid>
);

const FormLabelGrid = ({ children }) => (
    <Grid item xs={3}>
        {children}
    </Grid>
);

const FormComponentGrid = ({ children }) => (
    <Grid item xs={6} container direction="row" alignItems="center">
        {children}
    </Grid>
);

export { FormComponentGrid, FormRowGrid, FormLabelGrid, FormInputGrid };

FormComponentGrid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

FormRowGrid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

FormLabelGrid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

FormInputGrid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};
