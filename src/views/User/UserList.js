import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
const columns = [
    { id: 'fname', label: 'First Name', minWidth: 50 },
    { id: 'lname', label: 'Last Name', minWidth: 50 },
    { id: 'role', label: 'role', minWidth: 50 },
    { id: 'salary', label: 'Salary', minWidth: 20, align: 'right' },
    { id: 'department', label: 'Department', minWidth: 70 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phonenumber', label: 'Phone', minWidth: 50, align: 'right' }
];

function createData(fname, lname, role, salary, department, email, phonenumber) {
    return { fname, lname, role, salary, department, email, phonenumber };
}

const rows = [
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455'),
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455'),
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455'),
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455'),
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455'),
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455'),
    createData('Vishal', 'Gohil', 'Manager', 32000, 'Sales', 'Viishalgohil@gmail.com', '+91 9624 224455')
];

export default function UserList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <MainCard title="User List">
                <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
                    <Button variant="outlined" endIcon={<AddIcon />}>
                        Add User
                    </Button>
                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </MainCard>
        </>
    );
}
