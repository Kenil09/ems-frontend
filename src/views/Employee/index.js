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
import Profile from 'ui-component/Profile';
import AlphabetAvatar from 'ui-component/Profile/AlphabetAvatar';
import { userPermission } from 'utils/permissions';

const Employee = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.users.data);
    const currentUser = useSelector(({ user }) => user.details);

    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(fetchDepartments());
        dispatch(fetchUsers(currentUser?.company?._id));
        dispatch(fetchDesignations());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeEmployee = async (id) => {
        try {
            const { data } = await apiClient().delete(`/user/${id}`);
            dispatch(deleteUser(data?.user));
            toast.success(data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
    };

    const columns = [
        {
            name: 'profilePicture',
            label: 'Profile',
            options: {
                customBodyRender: (value, tableMeta) =>
                    value ? (
                        <Profile src={value} alt="profile" />
                    ) : (
                        <AlphabetAvatar name={`${tableMeta?.rowData[2]} ${tableMeta?.rowData[3]}`} />
                    )
            }
        },
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
            name: 'department',
            label: 'Department',
            options: {
                customBodyRender: (value) => value?.name
            }
        },
        {
            name: 'firstName',
            label: 'First Name'
        },
        {
            name: 'lastName',
            label: 'Last Name'
        },
        {
            name: 'nickName',
            label: 'Nick Name'
        },
        {
            name: 'email',
            label: 'Email Address'
        },

        {
            name: 'designation',
            label: 'Designation',
            options: {
                customBodyRender: (value) => value?.name
            }
        },
        {
            name: 'role',
            label: 'Role'
        },
        {
            name: 'reportingManager',
            label: 'Reporting Manager',
            options: {
                customBodyRender: (value) => (value ? `${value?.firstName} ${value?.lastName}` : '')
            }
        },
        {
            name: 'joiningDate',
            label: 'Joining Date',
            options: {
                customBodyRender: (value) => FormatDate(value)
            }
        },
        {
            name: 'createdBy',
            label: 'Added By',
            options: {
                customBodyRender: (value) => (value ? `${value?.firstName} ${value?.lastName}` : '')
            }
        },
        {
            name: 'createdAt',
            label: 'Added Time',
            options: {
                customBodyRender: (value) => FormatDate(value)
            }
        },
        {
            name: 'updatedBy',
            label: 'Modified By',
            options: {
                customBodyRender: (value) => {
                    return value ? `${value?.firstName} ${value?.lastName}` : '';
                }
            }
        },
        {
            name: 'updatedAt',
            label: 'Modified Time',
            options: {
                customBodyRender: (value) => FormatDate(value)
            }
        },
        {
            name: 'Actions',
            label: 'Actions',
            options: {
                onRowClick: false,
                empty: true,
                viewColumns: false,
                display: userPermission(currentUser),
                customBodyRender: (value, tableMeta) => (
                    <Box>
                        <Tooltip title="Edit">
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEvent();
                                    setModalTitle('Update Employee');
                                    const index = data.findIndex((user) => user._id === tableMeta.rowData[1]);
                                    setIsEditMode(data[index]);
                                }}
                                sx={{ marginRight: '12px' }}
                            >
                                <IconEdit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    removeEmployee(tableMeta.rowData[1]);
                                }}
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
                <MainCard title="Users">
                    {userPermission(currentUser) && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
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
                                Invite User
                            </Button>
                        </Box>
                    )}

                    <MUIDataTable columns={columns} data={data} options={options} />
                </MainCard>
            ) : (
                <EmployeeModal handleEvent={handleEvent} modalTitle={modalTitle} isEditMode={isEditMode} />
            )}
        </>
    );
};

export default Employee;
