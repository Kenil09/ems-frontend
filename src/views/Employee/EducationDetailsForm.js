import { useFormContext, useFieldArray } from 'react-hook-form';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import FormInput from 'ui-component/Form/FormInput';
import { Add, Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';

const EducationDetails = () => {
    const methods = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'educationDetails',
        rules: { minLength: 1 }
    });

    return (
        <Table aria-label="education details">
            <TableHead>
                <TableRow>
                    <TableCell>University Name</TableCell>
                    <TableCell>Degree/Diploma</TableCell>
                    <TableCell>Date of completion</TableCell>
                    <TableCell>
                        <IconButton
                            onClick={() => {
                                append({ university: '', degree: '', dateOfCompletion: null });
                            }}
                        >
                            <Add />
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {fields.map((feild, index) => (
                    <>
                        <TableRow key={feild.id} sx={{ alignContent: 'end' }}>
                            <TableCell>
                                <FormInput key={feild.id} name={`educationDetails.${index}.university`} variant="standard" fieldArray />
                            </TableCell>
                            <TableCell>
                                <FormInput key={feild.id} name={`educationDetails.${index}.degree`} variant="standard" fieldArray />
                            </TableCell>
                            <TableCell>
                                <FormInput
                                    key={feild.id}
                                    name={`educationDetails.${index}.dateOfCompletion`}
                                    type="date"
                                    disableFuture
                                    variant="standard"
                                    fieldArray
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => {
                                        remove(index);
                                    }}
                                >
                                    <Remove />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    );
};

export default EducationDetails;
