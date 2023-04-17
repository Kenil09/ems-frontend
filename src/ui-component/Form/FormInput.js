/* eslint-disable react/prop-types */
import {
    FormControl,
    Select,
    TextField,
    MenuItem,
    InputLabel,
    FormHelperText,
    ListSubheader,
    InputAdornment,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormContext } from 'react-hook-form';
import { Search } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

const useStyles = makeStyles(() => ({
    resize: {
        fontSize: '1rem'
    },
    customDatePicker: {
        '& .MuiInputBase-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                borderRadius: '0px',
                borderBottom: '1px solid grey'
            }
        }
    }
}));

const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

// eslint-disable-next-line react/prop-types
function FormInput({
    name,
    disabled,
    label,
    required,
    onChange,
    type = 'text',
    color,
    options,
    variant,
    searchAble,
    multiline,
    fieldArray,
    placeholder,
    className,
    multiple,
    formControlWidth,
    disableFuture,
    disablePast
}) {
    const classes = useStyles();
    const methods = useFormContext();
    const { setError, clearErrors } = methods;
    const [searchText, setSearchText] = useState('');
    const displayedOptions = useMemo(() => {
        if (searchText !== '') {
            return options.filter((option) => containsText(option.label, searchText));
        }
        return options;
    }, [options, searchText]);
    const fieldRegister = methods.register(name, { onChange: onChange ? onChange : () => {} });
    const field = name.split('.');
    const getFieldError = () => {
        if (Object.keys(methods.formState.errors).length === 0) {
            return undefined;
        }
        if (!methods.formState.errors?.[field[0]]) {
            return undefined;
        }
        if (typeof methods.formState.errors?.[field[0]][Number(field[1])] === undefined) {
            return undefined;
        }
        return methods.formState.errors?.[field[0]][Number(field[1])]?.[field[2]]?.message;
    };
    const error = Boolean(fieldArray) ? getFieldError() : methods.formState.errors[name]?.message;

    if (type === 'checkBox') {
        return (
            <FormControlLabel
                {...fieldRegister}
                onClick={(event) => {
                    methods.setValue(name, event.target.checked);
                }}
                className={className || ''}
                control={<Checkbox checked={methods.watch(name)} color="secondary" />}
            />
        );
    }

    return (
        <FormControl fullWidth={Boolean(!formControlWidth)}>
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
                                    multiple={multiple ? multiple : false}
                                    variant={variant || 'outlined'}
                                    labelId={`label-${name}`}
                                    error={Boolean(error)}
                                    MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                                >
                                    {Boolean(searchAble) && (
                                        <ListSubheader>
                                            <TextField
                                                size="small"
                                                placeholder="Type to search..."
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Search />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key !== 'Escape') {
                                                        // Prevents autoselecting item while typing (default Select behaviour)
                                                        e.stopPropagation();
                                                    }
                                                }}
                                            />
                                        </ListSubheader>
                                    )}
                                    {displayedOptions.map(({ value, label }) => (
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

                    case 'time':
                        const timeString = methods.watch(name);
                        const getValue = (val) => {
                            if (dayjs.isDayjs(val)) {
                                return val;
                            } else {
                                const dateString = `${dayjs().toISOString().split('T')[0]} ${val}`;
                                return val ? dayjs(dateString, 'YYYY-MM-DD HH:mm') : null;
                            }
                        };
                        const value = getValue(timeString);
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimeField']}>
                                    <TimeField
                                        {...fieldRegister}
                                        label={label}
                                        color={Boolean(error) ? 'error' : 'secondary'}
                                        value={value}
                                        size="medium"
                                        onError={(error, val) => {
                                            if (error === null) {
                                                clearErrors(name);
                                            } else {
                                                setError(name, { message: 'Please enter time in format HH:mm', type: 'pattern' });
                                            }
                                        }}
                                        fullWidth
                                        onChange={(newValue) => methods.setValue(name, newValue)}
                                        helperText={error}
                                        format="HH:mm"
                                        variant={variant}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        );

                    case 'date':
                        return (
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        {...fieldRegister}
                                        label={label}
                                        value={dayjs(methods.watch(name))}
                                        onChange={(newValue) => {
                                            methods.setValue(name, dayjs(newValue).toISOString());
                                        }}
                                        color={color || 'secondary'}
                                        disableFuture={Boolean(disableFuture)}
                                        disablePast={Boolean(disablePast)}
                                        error={Boolean(error)}
                                        className={classes.customDatePicker}
                                        renderInput={(params) => (
                                            <TextField variant="standard" {...params} error={Boolean(error)} helperText={error} />
                                        )}
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
                                placeholder={placeholder ? placeholder : ''}
                                required={required}
                                variant={variant || 'outlined'}
                                error={Boolean(error)}
                                helperText={error}
                                multiline={multiline}
                                rows={multiline ? 3 : 1}
                                InputProps={{
                                    classes: {
                                        input: classes.resize
                                    }
                                }}
                                {...fieldRegister}
                            />
                        );
                }
            })()}
        </FormControl>
    );
}

export default FormInput;
