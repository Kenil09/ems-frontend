/* eslint-disable react/prop-types */
import { FormControl, Select, TextField, MenuItem, InputLabel, FormHelperText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line react/prop-types
function FormInput({ name, disabled, label, required, onChange, type = 'text', value, color, options }) {
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
                                <InputLabel id={`label-${name}`} color={color || 'secondary'}>
                                    {label}
                                </InputLabel>
                                <Select
                                    {...fieldRegister}
                                    value={methods.watch(name)}
                                    label={label}
                                    color={color || 'secondary'}
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
                                label={label}
                                disabled={disabled}
                                value={value}
                                color={color || 'secondary'}
                                required={required}
                                error={Boolean(error)}
                                helperText={error}
                                InputLabelProps={{ shrink: true }}
                                {...fieldRegister}
                            />
                        );
                }
            })()}
        </FormControl>
    );
}

export default FormInput;
