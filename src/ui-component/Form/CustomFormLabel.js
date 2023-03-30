import { FormLabel } from '@mui/material';
import PropTypes from 'prop-types';

const CustomFormLabel = ({ id, required, content }) => (
    <FormLabel id={id} required={required} className={required ? 'form-label-required' : ''} sx={{ fontSize: '1rem', color: 'black' }}>
        {content}
    </FormLabel>
);

export default CustomFormLabel;

CustomFormLabel.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    content: PropTypes.string.isRequired
};
