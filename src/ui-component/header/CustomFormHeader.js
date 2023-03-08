import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomFormHeader = ({ content }) => (
    <Typography variant="h3" color="secondary">
        {content}
    </Typography>
);

export default CustomFormHeader;

CustomFormHeader.propTypes = {
    content: PropTypes.string.isRequired
};
