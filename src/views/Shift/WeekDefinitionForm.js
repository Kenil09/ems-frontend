import { useFormContext, useFieldArray } from 'react-hook-form';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import FormInput from 'ui-component/Form/FormInput';
import { Add, Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeekDefinitionForm = () => {
    const methods = useFormContext();
    const { fields } = useFieldArray({
        control: methods.control,
        name: 'weekDefinition',
        rules: { minLength: 5 }
    });

    return (
        <Table aria-label="weekdefinition details">
            <TableHead>
                <TableRow>
                    <TableCell rowSpan={2} width="30%" padding="none" align="center" className="week-table-cell week-header-padding">
                        Days
                    </TableCell>
                    <TableCell colSpan={5} align="center" padding="none" className="week-table-cell week-header-padding">
                        Weeks
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className="week-table-cell week-header-padding">
                        1st
                    </TableCell>
                    <TableCell align="center" className="week-table-cell week-header-padding">
                        2nd
                    </TableCell>
                    <TableCell align="center" className="week-table-cell week-header-padding">
                        3rd
                    </TableCell>
                    <TableCell align="center" className="week-table-cell week-header-padding">
                        4th
                    </TableCell>
                    <TableCell align="center" className="week-table-cell week-header-padding">
                        5th
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {days.map((day, index) => (
                    <>
                        <TableRow key={index}>
                            <TableCell align="center" padding="none" className="week-table-cell">
                                {day}
                            </TableCell>
                            {fields.map((field, index) => (
                                <TableCell align="center" padding="checkbox" className="week-table-cell">
                                    <FormInput
                                        key={field?.id}
                                        name={`weekDefinition.${index}.${day.toLowerCase()}`}
                                        className="week-checkBox"
                                        type="checkBox"
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    );
};

export default WeekDefinitionForm;
