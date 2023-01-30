import { FormControl, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line react/prop-types
function FormInput({ name, disabled, label, required, onChange, type = 'text', color }) {
    const methods = useFormContext();

    const fieldRegister = methods.register(name, { onChange: onChange ? onChange : () => {} });
    const error = methods.formState.errors[name]?.message;

    return (
        <FormControl fullWidth>
            {(() => {
                switch (type) {
                    default:
                        return (
                            <TextField
                                type={type}
                                label={label}
                                disabled={disabled}
                                color={color || 'secondary'}
                                required={required}
                                error={Boolean(error)}
                                helperText={error}
                                {...fieldRegister}
                            />
                        );
                }
            })()}
        </FormControl>
    );
}

export default FormInput;
