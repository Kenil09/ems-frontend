import { useEffect, useState } from 'react';
// material-ui
import { Box, Tooltip, IconButton, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import MUIDataTable from 'mui-datatables';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import DepartmentModal from './DepartmentModal';
import { deleteDepartment, fetchDepartments } from 'store/departmentSlice';
import FormatDate from 'views/utilities/FormatDate';
import apiClient from 'service/service';
import { departmentPermission } from 'utils/permissions';
import { currentUser } from 'store/userSlice';

const Department = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.department.data);
    const user = useSelector(currentUser);
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(fetchDepartments());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeDepartment = async (id) => {
        try {
            const { data } = await apiClient().delete(`/department/${id}`);
            dispatch(deleteDepartment(data?.department));
            toast.success(data?.message);
        } catch (error) {
            toast.error(error.data?.message);
        }
    };

    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
    };

    console.log(data);

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
            label: 'Name'
        },
        {
            name: 'departmentLead',
            label: 'Department Lead',
            options: {
                customBodyRender: (value) => (value ? `${value?.firstName} ${value?.lastName}` : '')
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
                display: departmentPermission(user),
                customBodyRender: (value, tableMeta) => (
                    <Box>
                        <Tooltip title="Edit">
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEvent();
                                    setModalTitle('Update Deparment');
                                    const index = data.findIndex((company) => company._id === tableMeta.rowData[0]);
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
                                    removeDepartment(tableMeta.rowData[0]);
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
                <MainCard title="Departments">
                    {departmentPermission(user) && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                            <Button
                                onClick={() => {
                                    setModalTitle('Add Department');
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
                                Add Department
                            </Button>
                        </Box>
                    )}
                    <MUIDataTable columns={columns} data={data} options={options} />
                </MainCard>
            ) : (
                <DepartmentModal open={show} handleEvent={handleEvent} modalTitle={modalTitle} isEditMode={isEditMode} />
            )}
        </>
    );
};

export default Department;
