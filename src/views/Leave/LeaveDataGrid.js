import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import './leaveTable.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export function formateLeave(type) {
    if (type == 'earnedLeave') {
        return 'Earned Leave';
    }
    if (type == 'casualLeave') {
        return 'Casual Leave';
    }
    if (type == 'leaveWithoutPay') {
        return 'Leave Without Pay';
    }
    if (type == 'sabbaticalLeave') {
        return 'Sabbatical Leave';
    }
    if (type == 'sickLeave') {
        return 'Sick Leave';
    }
}
export function addDays(date) {
    var result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
}
export const LeaveDataGrid = ({ leaves, show, setShow, setleaveDetails }) => {
    const [leaveType, setLeaveType] = useState('allLeaves');
    const AllUser = useSelector((state) => state.users.data);
    const loggedInUser = useSelector((state) => state.user.details);
    const AllLeaves = useSelector((state) => state.leaves.data);

    const handleChange = (event) => {
        setLeaveType(event.target.value);
    };
    const filteredUsers = AllUser.filter((user) => user.reportingManager?._id === loggedInUser._id);

    const leaveAccounts = filteredUsers.map((user) => {
        const userLeaveAccounts = AllLeaves.filter((account) => account.employee === user._id);
        return {
            user: user,
            leave: userLeaveAccounts
        };
    });

    const filterLeaves = () => {
        switch (leaveType) {
            case 'upcomingLeaves':
                return leaves.filter((leave) => {
                    return new Date(leave.ToDate) > new Date() && leave.Status !== 'Rejected';
                });
            case 'previousLeaves':
                return leaves.filter((leave) => new Date(leave.ToDate) < new Date());
            default:
                return leaves;
        }
    };
    const filteredLeave = filterLeaves();
    // //(filteredLeaves, 'filteredLeaves');

    return (
        <table className="my-table">
            <thead>
                <tr>
                    <th>
                        <h2 style={{ color: '#673ab7' }}>Leaves</h2>
                    </th>
                    <th>
                        <h2 style={{ color: '#f2f2f2' }}>L</h2>
                    </th>
                    &nbsp;&nbsp;
                    <th style={{ marginLeft: '10px' }}>
                        <FormControl style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Select labelId="leave-type" id="leave-type-select" value={leaveType} onChange={handleChange}>
                                <MenuItem value="allLeaves">All Leaves</MenuItem>
                                <MenuItem value="upcomingLeaves">Upcoming Leaves</MenuItem>
                                <MenuItem value="previousLeaves">Previous Leaves</MenuItem>
                            </Select>
                        </FormControl>
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredLeave?.length > 0 ? (
                    filteredLeave.map((leave) => (
                        <tr
                            className="leaves"
                            key={leave._id}
                            onClick={() => {
                                setleaveDetails(leave);
                                setShow(!show);
                                //(leave, 'leavsjdb');
                            }}
                        >
                            <td>
                                {addDays(leave?.FromDate).toISOString().split('T')[0]}
                                <br />
                                To <br />
                                {addDays(leave?.ToDate).toISOString().split('T')[0]}
                            </td>
                            <td>
                                {formateLeave(leave.LeaveType)}
                                <br />
                                {leave?.duration} Days(s)
                            </td>
                            <td>{leave.Reason}</td>
                            {leave.Status === 'Rejected' ? <td style={{ color: 'Red', fontWeight: 'Normal' }}>Cancelled</td> : <td></td>}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td>
                            <Typography>No Leaves Found</Typography>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default LeaveDataGrid;
