/* eslint-disable react/prop-types */
import { FormControl, Select, TextField, MenuItem, InputLabel, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line react/prop-types
function FormInput({ name, disabled, label, required, onChange, type = 'text', color, options, variant }) {
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
                                {label && (
                                    <InputLabel id={`label-${name}`} color={color || 'secondary'}>
                                        {label}
                                    </InputLabel>
                                )}
                                <Select
                                    {...fieldRegister}
                                    value={methods.watch(name)}
                                    label={label}
                                    color={color || 'secondary'}
                                    variant={variant || 'outlined'}
                                    labelId={`label-${name}`}
                                    error={Boolean(error)}
                                >
                                    {options.map(({ value, label }) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error sx={{ textAlign: 'start' }}>
                                    {error}
                                </FormHelperText>
                            </>
                        );

                    case 'date':
                        return (
                            <>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        {...fieldRegister}
                                        value={methods.watch(name)}
                                        label={label}
                                        color={color || 'secondary'}
                                        error={Boolean(error)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </>
                        );

                    default:
                        return (
                            <TextField
                                type={type}
                                label={label || ''}
                                disabled={disabled}
                                color={color || 'secondary'}
                                size="medium"
                                required={required}
                                variant={variant || 'outlined'}
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
