import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const HotAlert = ({ message, showAlert, severity, setAlert }) => {
    useEffect(() => {
        const notify = () =>
            toast[severity](message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                }
            });
        if (showAlert) {
            notify();
            setAlert({ state: '', show: false, message: '' });
        }
    }, [message, setAlert, severity, showAlert]);

    return <Toaster toastOptions={{ className: 'toast-alert' }} />;
};

export default HotAlert;

HotAlert.propTypes = {
    message: PropTypes.string.isRequired,
    showAlert: PropTypes.bool.isRequired,
    severity: PropTypes.string.isRequired,
    setAlert: PropTypes.func.isRequired
};
