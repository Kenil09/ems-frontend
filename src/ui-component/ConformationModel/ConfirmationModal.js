import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

const ConfirmationModal = (props) => {
    const { open, onClose, onConfirm, title, message } = props;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontSize: '24px', color: '#673ab7' }}>{title}</DialogTitle>
            <DialogContent sx={{ height: '8vh' }}>
                <DialogContentText sx={{ fontSize: '18px' }}>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} variant="contained" color="secondary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ConfirmationModalWithReason = (props) => {
    const { open, onClose } = props;
    const [cancellationMessage, setCancellationMessage] = React.useState('');

    const handleConfirm = () => {
        if (cancellationMessage.trim() !== '') {
            props.onConfirm(cancellationMessage);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontSize: '26px', color: '#673ab7' }}>{props.title}</DialogTitle>
                <DialogContent sx={{ height: 'auto' }}>
                    <DialogContentText sx={{ fontSize: '17px' }}>{props.message}</DialogContentText>
                    <TextField
                        margin="dense"
                        label="Cancellation Message"
                        fullWidth
                        multiline
                        rows={4}
                        value={cancellationMessage}
                        onChange={(e) => setCancellationMessage(e.target.value)}
                        required
                        error={cancellationMessage.trim() === ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="secondary" disabled={cancellationMessage.trim() === ''}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { ConfirmationModal, ConfirmationModalWithReason };
