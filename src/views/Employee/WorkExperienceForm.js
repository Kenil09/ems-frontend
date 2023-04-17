import { useFormContext, useFieldArray } from 'react-hook-form';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import FormInput from 'ui-component/Form/FormInput';
import { Add, Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const WorkExperienceForm = () => {
    const methods = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'workExperience',
        rules: { minLength: 1 }
    });

    return (
        <Table aria-label="workExperience details">
            <TableHead>
                <TableRow>
                    <TableCell>Previous Company Name</TableCell>
                    <TableCell>Job Title</TableCell>
                    <TableCell>From Date</TableCell>
                    <TableCell>To Date</TableCell>
                    <TableCell>Job Description</TableCell>
                    <TableCell>
                        <IconButton
                            onClick={() => {
                                append({ previousCompany: '', jobTitle: '', fromDate: null, toDate: null, jobDescription: '' });
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
                                <FormInput key={feild.id} name={`workExperience.${index}.previousCompany`} variant="standard" fieldArray />
                            </TableCell>
                            <TableCell>
                                <FormInput key={feild.id} name={`workExperience.${index}.jobTitle`} variant="standard" fieldArray />
                            </TableCell>
                            <TableCell>
                                <FormInput
                                    key={feild.id}
                                    name={`workExperience.${index}.fromDate`}
                                    type="date"
                                    disableFuture
                                    variant="standard"
                                    fieldArray
                                />
                            </TableCell>
                            <TableCell>
                                <FormInput
                                    key={feild.id}
                                    name={`workExperience.${index}.toDate`}
                                    type="date"
                                    variant="standard"
                                    disableFuture
                                    fieldArray
                                />
                            </TableCell>
                            <TableCell>
                                <FormInput key={feild.id} name={`workExperience.${index}.jobDescription`} variant="standard" fieldArray />
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

export default WorkExperienceForm;
