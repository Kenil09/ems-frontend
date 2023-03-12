/* eslint-disable react/prop-types */
import { FormControl, Select, TextField, MenuItem, InputLabel, FormHelperText, ListSubheader, InputAdornment } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
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
    fieldArray
}) {
    const classes = useStyles();
    const methods = useFormContext();
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

                    case 'date':
                        return (
                            <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        {...fieldRegister}
                                        label={label}
                                        onChange={(newValue) => {
                                            methods.setValue(name, dayjs(newValue).toISOString());
                                        }}
                                        color={color || 'secondary'}
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
