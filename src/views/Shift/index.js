import { useEffect, useState } from 'react';
// material-ui
import { Box, Tooltip, IconButton, Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import MUIDataTable from 'mui-datatables';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import { fetchShifts, deleteShift } from 'store/shiftSlice';
import { fetchDepartments } from 'store/departmentSlice';
import FormatDate from 'views/utilities/FormatDate';
import apiClient from 'service/service';
import ShiftModal from './ShiftModal';
import { shiftPermission } from 'utils/permissions';

const Shift = () => {
    const dispatch = useDispatch();
    const data = useSelector(({ shift }) => shift.data);
    const currentUser = useSelector(({ user }) => user.details);
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(fetchShifts(currentUser?.company?._id));
        dispatch(fetchDepartments(currentUser?.company?._id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeShift = async (id) => {
        try {
            const { data } = await apiClient().delete(`/shift/${id}`);
            dispatch(deleteShift(data?.shift));
            toast.success(data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
    };

    const deletePermission = (type) => {
        if (type === 'general') return false;
        if (type === 'custom') return true;
        return false;
    };

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
            name: 'type',
            label: 'Shift Type'
        },
        {
            name: 'applicableDepartments',
            label: 'Applicable Departments',
            options: {
                customBodyRender: (value) => <Typography>{value.map(({ name }) => name).toString()}</Typography>
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
                customBodyRender: (value) => FormatDate(value),
                disable: true
            }
        },
        {
            name: 'Actions',
            label: 'Actions',
            options: {
                onRowClick: false,
                empty: true,
                viewColumns: false,
                display: shiftPermission(currentUser),
                customBodyRender: (value, tableMeta) => (
                    <Box>
                        <Tooltip title="Edit">
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEvent();
                                    setModalTitle('Update Shift');
                                    const index = data.findIndex((user) => user._id === tableMeta.rowData[0]);
                                    setIsEditMode(data[index]);
                                }}
                                sx={{ marginRight: '12px' }}
                            >
                                <IconEdit />
                            </IconButton>
                        </Tooltip>
                        {deletePermission(tableMeta?.rowData[2]) && (
                            <Tooltip title="Delete">
                                <IconButton
                                    color="secondary"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeShift(tableMeta.rowData[0]);
                                    }}
                                    sx={{ color: 'error.main' }}
                                >
                                    <IconTrash />
                                </IconButton>
                            </Tooltip>
                        )}
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
                <MainCard title="Shifts">
                    {shiftPermission(currentUser) && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                            <Button
                                onClick={() => {
                                    setModalTitle('Add Shift');
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
                                Add Shift
                            </Button>
                        </Box>
                    )}

                    <MUIDataTable columns={columns} data={data} options={options} />
                </MainCard>
            ) : (
                <ShiftModal handleEvent={handleEvent} modalTitle={modalTitle} isEditMode={isEditMode} />
            )}
        </>
    );
};

export default Shift;
