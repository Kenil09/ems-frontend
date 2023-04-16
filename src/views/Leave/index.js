import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import { AddLeaveAccount, fetchTypeLeaves } from 'store/TypesLeaveSlice';
import { LeaveModel } from './LeaveModel';
import { LeaveDataGrid } from './LeaveDataGrid';
import { addLeave, fetchLeaves } from 'store/leaveSlice';
import { ViewLeaveModel } from './ViewLeaveModel';
import { fetchAllLeaves } from 'store/allLeaveSlice';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchAllLeaveAccount } from 'store/allLeaveAccount';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
const LeavesItem = [
    {
        id: 'casualLeave',
        name: 'Casual Leave',
        src: 'icons8-leave-96.png'
    },
    {
        id: 'earnedLeave',
        name: 'Earned Leave',
        src: 'icons8-paid-bill-96.png'
    },
    {
        id: 'leaveWithoutPay',
        name: 'Leave Without Pay',
        src: 'icons8-leave-80.png'
    },
    {
        id: 'sabbaticalLeave',
        name: 'Sabbatical Leave',
        src: 'icons8-time-span-96.png'
    },
    {
        id: 'sickLeave',
        name: 'Sick Leave',
        src: 'icons8-sick-64.png'
    }
];
const Index = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.details);
    const [leaveDetails, setleaveDetails] = useState({});
    const TypesLeave = useSelector((state) => state.TypesLeave.data);
    const leaves = useSelector((state) => state.leave.data);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    //(leaves, 'leaves');
    //(TypesLeave, 'TypesLeave');

    const AllUser = useSelector((state) => state.users.data);
    const loggedInUser = useSelector((state) => state.user.details);
    const AllLeaves = useSelector((state) => state.leaves.data);
    const AllLeaveAccount = useSelector((state) => state.AllLeaveAccount.data);
    const [leaveType, setLeaveType] = useState(-1);

    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        dispatch(fetchTypeLeaves(user._id));
        dispatch(fetchLeaves(user._id));
        dispatch(fetchAllLeaves());
        dispatch(fetchAllLeaveAccount());
    }, []);

    const isLeaveEmpty = () => {
        return Object.keys(leaveDetails).length === 0;
    };

    const filteredEmployees = AllUser?.filter((employee) => employee.reportingManager?._id === loggedInUser._id);

    const filteredLeaves = AllLeaves?.filter((leave) => filteredEmployees.some((employee) => employee._id === leave.employee));

    const combinedData = filteredEmployees.map((employee) => {
        const employeeLeaves = filteredLeaves?.filter((leave) => leave.employee === employee._id);

        const employeeLeaveTypes = AllLeaveAccount?.find((leaveType) => leaveType.employee === employee._id);

        return {
            ...employee,
            leaves: employeeLeaves,
            leaveTypes: employeeLeaveTypes
        };
    });
    useEffect(() => {
        if (leaveType === -1) {
            dispatch(fetchTypeLeaves(user._id));
            dispatch(fetchLeaves(user._id));
            // //('calling');
        } else {
            dispatch(addLeave(combinedData[leaveType]?.leaves));
            dispatch(AddLeaveAccount(combinedData[leaveType]?.leaveTypes));
            // //('putting');
        }
    }, [show]);
    //(combinedData, 'combinedData');
    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
        setleaveDetails({});
    };
    // //(leaveType, 'leaveIndex');

    const handleChange = (leaveIndex) => {
        if (leaveIndex.target.value === -1) {
            // //('call');
            dispatch(fetchTypeLeaves(user._id));
            dispatch(fetchLeaves(user._id));
            setLeaveType(-1);
        } else {
            // //('put');

            let menuItemName = combinedData[leaveIndex.target.value]?.firstName + ' ' + combinedData[leaveIndex.target.value]?.lastName;
            setLeaveType(leaveIndex.target.value);
            dispatch(addLeave(combinedData[leaveIndex.target.value]?.leaves));
            dispatch(AddLeaveAccount(combinedData[leaveIndex.target.value]?.leaveTypes));
        }
    };

    return (
        <div>
            {!show ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '-45px', marginLeft: '28px' }}>
                        <FormControl style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Select labelId="leave-type" id="leave-type-select" value={leaveType} onChange={handleChange}>
                                <MenuItem value={-1} key="-1">
                                    My Leave
                                </MenuItem>
                                {combinedData?.map(({ firstName, lastName, _id }, index) => (
                                    <MenuItem value={index} key={_id}>
                                        {firstName} {lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                        <Button
                            onClick={() => {
                                setModalTitle('Apply Leave');
                                handleEvent();
                                //('Leave Details');
                            }}
                            variant="contained"
                            // component={RouterLink}
                            to="#"
                            startIcon={<IconPlus />}
                            color="secondary"
                            size="large"
                            disableElevation
                            disabled={leaveType !== -1}
                        >
                            Apply Leave
                        </Button>
                    </Box>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            {TypesLeave &&
                                LeavesItem.map(({ id, name, src }, index) => (
                                    <Grid key={index} item>
                                        <Paper
                                            sx={{
                                                height: 240,
                                                width: 187,
                                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
                                            }}
                                        >
                                            <Typography
                                                style={{ textAlign: 'center', paddingTop: '20px', fontWeight: 'normal' }}
                                                variant="h3"
                                            >
                                                {name}
                                            </Typography>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                                <img
                                                    src={require(`../../assets/images/icons/${src}`)}
                                                    alt="Icon"
                                                    style={{ width: '70px', height: '70px' }}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: 'block',
                                                    justifyContent: 'center',
                                                    marginTop: '30px',
                                                    marginLeft: '20px'
                                                }}
                                            >
                                                <Typography variant="h4" fontWeight={'lighter'}>
                                                    Available : {TypesLeave[id]?.total - TypesLeave[id]?.taken}
                                                </Typography>
                                                <pre>
                                                    <Typography variant="h4" fontWeight={'lighter'}>
                                                        Booked : {TypesLeave[id]?.taken}
                                                    </Typography>
                                                </pre>
                                            </div>
                                        </Paper>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                    {leaves && (
                        <LeaveDataGrid
                            leaves={leaves}
                            show={show}
                            handleEvent={handleEvent}
                            setleaveDetails={setleaveDetails}
                            setShow={setShow}
                        />
                    )}
                </>
            ) : (
                <>
                    {isLeaveEmpty() ? (
                        <LeaveModel
                            handleEvent={handleEvent}
                            open={open}
                            setOpen={setOpen}
                            modalTitle={modalTitle}
                            isEditMode={isEditMode}
                        />
                    ) : (
                        <ViewLeaveModel viewLeave={leaveDetails} handleEvent={handleEvent} setleaveDetails={setleaveDetails} />
                    )}
                </>
            )}
        </div>
    );
};

export default Index;
