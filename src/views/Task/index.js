import { Grid, Tab, Button, Tabs, Box, Typography, Tooltip, IconButton } from '@mui/material';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import TaskModal from './TaskModal';
import UserSelect from 'ui-component/Form/UserSelect';
import apiClient from 'service/service';
import toast from 'react-hot-toast';
import FormatDate from 'views/utilities/FormatDate';
import MUIDataTable from 'mui-datatables';
import { fetchUsers } from 'store/usersSlice';
import { startLoader, endLoader } from 'store/loaderSlice';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Task = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(({ user }) => user.details);
    const [show, setShow] = useState(false);
    const [taskUser, setTaskUser] = useState(currentUser?._id);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [userTaskdata, setUserTaskdata] = useState([]);

    const handleEvent = () => {
        setShow(!show);
        setIsEditMode();
    };

    const startFetching = () => {
        dispatch(startLoader());
    };

    const endFetching = () => {
        dispatch(endLoader());
    };

    useEffect(() => {
        dispatch(fetchUsers(currentUser?.company?._id));
    }, []);

    const getUserTaskdata = async (val) => {
        try {
            startFetching();
            const { data } = await apiClient().get(`/task/${val}`);
            setUserTaskdata(data?.tasks);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            endFetching();
        }
    };

    const deleteTask = async (id) => {
        try {
            startFetching();
            const { data } = await apiClient().delete(`/task/${id}`);
            getUserTaskdata(taskUser);
            toast.success(data?.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            endFetching();
        }
    };

    useEffect(() => {
        // getTaskAttchements();
        if (taskUser) {
            getUserTaskdata(taskUser);
        }
    }, [taskUser]);

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
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
            name: 'state',
            label: 'State'
        },

        {
            name: 'title',
            label: 'Title'
        },
        {
            name: 'assignee',
            label: 'Assignee',
            options: {
                customBodyRender: (value) => (value ? `${value?.firstName} ${value?.lastName}` : '')
            }
        },
        {
            name: 'reporter',
            label: 'Reporter',
            options: {
                customBodyRender: (value) => (value ? `${value?.firstName} ${value?.lastName}` : '')
            }
        },
        {
            name: 'createdAt',
            label: 'Assigned Date',
            options: {
                customBodyRender: (value) => FormatDate(value)
            }
        },
        {
            name: 'dueDate',
            label: 'Due Date',
            options: {
                customBodyRender: (value) => FormatDate(value)
            }
        },
        {
            name: 'completedDate',
            label: 'Completion Date',
            options: {
                customBodyRender: (value) => {
                    return value ? FormatDate(value) : '';
                }
            }
        },
        {
            name: 'Actions',
            label: 'Actions',
            options: {
                onRowClick: false,
                empty: true,
                viewColumns: false,
                customBodyRender: (value, tableMeta) => (
                    <Box display="flex">
                        <Tooltip title="Edit">
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleEvent();
                                    setModalTitle('Task View');
                                    const data = userTaskdata.find((task) => task?._id === rowData[0]);
                                    setIsEditMode(data);
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
                                    deleteTask(tableMeta.rowData[0]);
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
            const data = userTaskdata.find((task) => task?._id === rowData[0]);
            setModalTitle('Task View');
            handleEvent();
            setIsEditMode(data);
        }
    };

    return (
        <>
            {!show ? (
                <MainCard title="Tasks">
                    <Grid display="flex" justifyContent="space-between" container borderRadius="10px">
                        <Grid item xs={3}>
                            <UserSelect user={taskUser} disableCurrentUser setUser={setTaskUser} profileSize={3} searchAble={true} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    setModalTitle('Add Task');
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
                                Add Task
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container marginTop={2}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="task tabs"
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label="Assigned Task" {...a11yProps(0)} />
                            <Tab label="Submitted Task" {...a11yProps(1)} />
                            <Tab label="Completed Task" {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                    <TabPanel value={tabValue} index={0}>
                        <MUIDataTable data={userTaskdata.filter(({ state }) => state === 'assigned')} columns={columns} options={options} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <MUIDataTable data={userTaskdata.filter(({ state }) => state === 'review')} columns={columns} options={options} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <MUIDataTable
                            data={userTaskdata.filter(({ state }) => state === 'completed')}
                            columns={columns}
                            options={options}
                        />
                    </TabPanel>
                </MainCard>
            ) : (
                <TaskModal
                    handleEvent={handleEvent}
                    modalTitle={modalTitle}
                    isEditMode={isEditMode}
                    selectedUser={taskUser}
                    getTaskData={getUserTaskdata}
                />
            )}
        </>
    );
};

export default Task;
