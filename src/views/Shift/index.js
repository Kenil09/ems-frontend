import { useEffect, useState } from 'react';
// material-ui
import { Box, Tooltip, IconButton, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import MUIDataTable from 'mui-datatables';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import EmployeeModal from './EmployeeModal';
import { deleteDepartment, fetchDepartments } from 'store/departmentSlice';
import { deleteUser, fetchUsers } from 'store/usersSlice';
import { fetchDesignations } from 'store/designationSlice';
import FormatDate from 'views/utilities/FormatDate';
import apiClient from 'service/service';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Attendance = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
    };
    const data = [
        {
            name: 'Ajay',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Shiva',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Vijay',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Hari',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Kenil',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Vansh',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Vishal',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        },
        {
            name: 'Yash',
            startTime: '10:12:AM',
            endTime: '06:10:PM',
            company: 'Shiva',
            applicableDepartments: 'IT'
        }
    ];
    const columns = [
        {
            name: '_id',
            label: 'id',
            options: {
                display: false,
                viewColumns: false,
                filter: false,
                sort: false
            }
        },
        {
            name: 'name',
            label: 'Shift Name'
        },
        {
            name: 'startTime',
            label: 'From'
        },
        {
            name: 'endTime',
            label: 'To'
        },
        {
            name: 'company',
            label: 'Company Name'
        },
        {
            name: 'applicableDepartments',
            label: 'Department'
            // options: {
            //     customBodyRender: (value) => value?.name
            // }
        },
        {
            name: 'Actions',
            label: 'Actions',
            options: {
                onRowClick: false,
                empty: true,
                viewColumns: false,
                customBodyRender: (value, tableMeta) => (
                    <Box>
                        <Tooltip title="Edit">
                            <IconButton
                                color="secondary"
                                // onClick={(event) => {
                                //     event.stopPropagation();
                                //     handleEvent();
                                //     setModalTitle('Update Employee');
                                //     const index = data.findIndex((company) => company._id === tableMeta.rowData[0]);
                                //     setIsEditMode(data[index]);
                                // }}
                                sx={{ marginRight: '12px' }}
                            >
                                <IconEdit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                color="secondary"
                                // onClick={(event) => {
                                //     event.stopPropagation();
                                //     removeEmployee(tableMeta.rowData[0]);
                                // }}
                                sx={{ color: 'error.main' }}
                            >
                                <IconTrash />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        }
    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        selectableRows: 'none',
        onRowClick: (rowData) => {
            console.log(rowData);
        }
    };

    return (
        <>
            {!show ? (
                <MainCard title="Shift">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: '24px'
                        }}
                    >
                        <Button
                            onClick={() => {
                                setModalTitle('Add Employee');
                                handleEvent();
                            }}
                            variant="contained"
                            // component={RouterLink}
                            to="#"
                            startIcon={<IconPlus />}
                            color="secondary"
                            size="large"
                            disableElevation
                        >
                            Add Custom Shift
                        </Button>
                    </Box>
                    <MUIDataTable columns={columns} data={data} options={options} />
                </MainCard>
            ) : (
                <EmployeeModal handleEvent={handleEvent} modalTitle={modalTitle} isEditMode={isEditMode} />
            )}
        </>
    );
};

export default Attendance;
