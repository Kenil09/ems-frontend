import { useEffect, useState } from 'react';
// material-ui
import { Box, Tooltip, IconButton, Button } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import MUIDataTable from 'mui-datatables';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import { useGetDesignationsQuery } from 'store/Services/designation';
import DesignationModal from './DesignationModal';
import dayjs from 'dayjs';

const Designations = () => {
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState();

    const { data, refetch } = useGetDesignationsQuery(undefined, {
        pollingInterval: 60000
    });

    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
    };

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            label: 'Designation Name'
        },
        {
            name: 'createdAt',
            label: 'Added Time',
            customBodyRender: (value) => dayjs('DD-MMM-YYYY HH:mm A')
        },
        {
            name: 'Actions',
            label: 'Actions',
            options: {
                onRowClick: false,
                empty: true,
                viewColumns: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Box>
                        <Tooltip title="Edit">
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEvent();
                                    setModalTitle('Update Designation Details');
                                    const index = data.companies.findIndex((company) => company._id === tableMeta.rowData[0]);
                                    setIsEditMode(data.companies[index]);
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
                                    // deleteCompany(tableMeta.rowData[0]);
                                    // setConfirmationOpen(true);
                                    // setDeleteData(tableMeta.rowData[0]);
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
        <MainCard title="Designations">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <Button
                    onClick={() => {
                        setModalTitle('Add Designation Details');
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
                    Add Designation
                </Button>
            </Box>
            <MUIDataTable columns={columns} data={[]} options={options} />
            <DesignationModal open={show} handleEvent={handleEvent} modalTitle={modalTitle} isEditMode={isEditMode} />
        </MainCard>
    );
};

export default Designations;