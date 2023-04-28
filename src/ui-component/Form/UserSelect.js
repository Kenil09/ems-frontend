import { Search } from '@mui/icons-material';
import { FormControl, Grid, InputAdornment, ListSubheader, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Profile from 'ui-component/Profile';
import { getUserOptions } from 'views/utilities/FormOptions';

const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const UserSelect = ({ user, setUser, searchAble, disableCurrentUser, profileSize = 1, reporter }) => {
    const currentUser = useSelector(({ user }) => user.details);
    const usersData = useSelector(({ users }) => users.data).filter(({ company }) => company?._id === currentUser?.company?._id);
    const users = usersData.filter((user) => {
        if (currentUser?._id === user?._id) {
            return true;
        }
        if (reporter) {
            return true;
        }
        if (currentUser?.role === 'teamMember') {
            return currentUser?._id === user?._id;
        } else if (currentUser?.role === 'teamIncharge') {
            return currentUser?._id === user?.reportingManager?._id;
        } else if (currentUser?.role === 'manager') {
            return currentUser?.department?._id === user?.department?._id;
        } else if (currentUser?.role === 'admin') {
            return true;
        }
    });
    const userOptions = getUserOptions(users);
    const [searchText, setSearchText] = useState('');
    const displayedOptions = useMemo(() => {
        if (searchText !== '') {
            return userOptions.filter((option) => containsText(option.label, searchText));
        }
        return userOptions;
    }, [userOptions, searchText]);

    useEffect(() => {
        if (!disableCurrentUser) {
            setUser(currentUser?._id);
        }
    }, []);

    const size = {
        width: 26 + 6 * profileSize,
        height: 26 + 6 * profileSize
    };

    return (
        <FormControl fullWidth>
            <Select
                value={user}
                disableUnderline={true}
                onChange={(e) => {
                    e.preventDefault();
                    // const user = userOptions.find(({ _id }) => _id === val);
                    setUser(e.target.value);
                }}
                renderValue={(val) => {
                    const user = users.find(({ _id }) => _id === val);
                    console.log(user?.profilePicture, user?.firstName);
                    return (
                        <Grid container>
                            <Profile src={user?.profilePicture} alt="profile" sx={size} />
                            <Typography display={'flex'} alignItems="center" marginLeft={'10px'}>
                                {user?.firstName} {user?.lastName}
                            </Typography>
                        </Grid>
                    );
                }}
                variant="standard"
            >
                {Boolean(searchAble) && (
                    <ListSubheader>
                        <TextField
                            size="small"
                            placeholder="Type to search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key !== 'Escape') {
                                    // Prevents autoselecting item while typing (default Select behaviour)
                                    e.stopPropagation();
                                }
                            }}
                        />
                    </ListSubheader>
                )}
                {displayedOptions.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default UserSelect;
