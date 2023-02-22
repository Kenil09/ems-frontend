/* eslint-disable react/prop-types */
import { FormControl, Select, TextField, MenuItem, InputLabel, FormHelperText } from '@mui/material';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line react/prop-types
function FormInput({ name, disabled, label, required, onChange, type = 'text', color, options }) {
    const methods = useFormContext();

    const fieldRegister = methods.register(name, { onChange: onChange ? onChange : () => {} });
    const error = methods.formState.errors[name]?.message;

    return (
        <FormControl fullWidth>
            {(() => {
                switch (type) {
                    case 'select':
                        return (
                            <>
                                <InputLabel id={`label-${name}`}>{label}</InputLabel>
                                <Select
                                    {...fieldRegister}
                                    value={methods.watch(name)}
                                    label={label}
                                    labelId={`label-${name}`}
                                    error={Boolean(error)}
                                >
                                    {options.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error>{error}</FormHelperText>
                            </>
                        );

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
