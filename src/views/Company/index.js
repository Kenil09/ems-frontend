import { useEffect, useState } from 'react';
// material-ui
import { Box, Tooltip, IconButton, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from 'store/companySlice';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import MUIDataTable from 'mui-datatables';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import CompanyModal from './CompanyModal';

// ==============================|| SAMPLE PAGE ||============================== //

const Company = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.company.data);
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const handleEvent = () => {
        setShow(!show);
    };
    useSelector((state) => console.log(state.user));
    useEffect(() => {
        dispatch(fetchCompanies());
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
            label: 'name'
        },
        {
            name: 'address',
            label: 'Address'
        },
        {
            name: 'city',
            label: 'City'
        },
        {
            name: 'state',
            label: 'State'
        },
        {
            name: 'zipcode',
            label: 'Zipcode'
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
                                    setModalTitle('Update Company Details');
                                    // const index = data.findIndex((office) => office._id === tableMeta.rowData[0]);
                                    // setUpdateValue(data[index]);
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
        <MainCard title="Company">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <Button
                    onClick={() => {
                        handleEvent();
                        setModalTitle('Add Company Details');
                    }}
                    variant="contained"
                    // component={RouterLink}
                    to="#"
                    startIcon={<IconPlus />}
                    color="secondary"
                    size="large"
                    disableElevation
                >
                    Add Office
                </Button>
            </Box>
            <MUIDataTable columns={columns} data={data} options={options} />
            <CompanyModal open={show} handleEvent={handleEvent} modalTitle={modalTitle} />
        </MainCard>
    );
};

export default Company;
