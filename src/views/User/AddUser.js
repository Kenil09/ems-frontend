import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import * as yup from 'yup';

const schema = yup
    .object({
        fname: yup.string().required('FirstName Is Required'),
        lname: yup.string().required('LastName Is Required'),
        role: yup.string().required('Role Is Required'),
        salary: yup.string().required('Salary Is Required'),
        department: yup.string().required('Department Is Required'),
        email: yup.string().required('Email Is Required').email('This Must be Email'),
        phonenumber: yup.string().required('Phone Is Required')
    })
    .required();
export default function AddUser() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (e) => {
        console.log(e);
    };
    return (
        <MainCard title="Add User">
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        {...register('fname')}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        helperText={errors.fname?.message}
                        error={errors?.fname ? true : false}
                    />
                    <TextField
                        id="outlined-basic"
                        {...register('lname')}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        helperText={errors.lname?.message}
                        error={errors?.lname ? true : false}
                    />
                </Box>
                <br />
                <br />
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(3, 1fr)'
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        {...register('role')}
                        label="Role"
                        variant="outlined"
                        fullWidth
                        helperText={errors.role?.message}
                        error={errors?.role ? true : false}
                    />
                    <TextField
                        id="outlined-basic"
                        {...register('salary')}
                        label="Salary"
                        variant="outlined"
                        fullWidth
                        helperText={errors.salary?.message}
                        error={errors?.salary ? true : false}
                    />
                    <TextField
                        id="outlined-basic"
                        {...register('department')}
                        label="Department"
                        variant="outlined"
                        fullWidth
                        helperText={errors.department?.message}
                        error={errors?.department ? true : false}
                    />
                </Box>
                <br />
                <br />
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 3,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        {...register('email')}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        helperText={errors.email?.message}
                        error={errors?.email ? true : false}
                    />
                    <TextField
                        id="outlined-basic"
                        {...register('phonenumber')}
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        helperText={errors.phonenumber?.message}
                        error={errors?.phonenumber ? true : false}
                    />
                </Box>
                <br />
                <br />
                <Button type="submit" variant="outlined" endIcon={<AddIcon />}>
                    Add
                </Button>
            </form>
        </MainCard>
    );
}
