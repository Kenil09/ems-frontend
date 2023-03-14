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

    return (
        <>
            {!show ? (
                <MainCard title="Shift">
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
                            Add Custom Shift
                        </Button>
                    </Box>
                </MainCard>
            ) : (
                <EmployeeModal handleEvent={handleEvent} modalTitle={modalTitle} isEditMode={isEditMode} />
            )}
        </>
    );
};

export default Attendance;
