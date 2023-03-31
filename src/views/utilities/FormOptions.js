export const Roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'TeamMember', value: 'teamMember' },
    { label: 'TeamIncharge', value: 'teamIncharge' },
    { label: 'Manager', value: 'manager' }
];

export const EmployeeTyes = [
    { label: 'Permanent', value: 'permanent' },
    { label: 'On Contract', value: 'onContract' },
    { label: 'Temporary', value: 'temporary' },
    { label: 'Trainee', value: 'trainee' }
];

export const GenderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' }
];

export const MaritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' }
];

export const getDesignationOptions = (data) => {
    return data?.map(({ _id, name }) => ({ label: name, value: _id }));
};

export const getDepartmentOptions = (data) => {
    return data?.map(({ _id, name }) => ({ label: name, value: _id }));
};

export const getUserOptions = (data) => {
    return data?.map(({ _id, firstName, lastName }) => ({ label: `${firstName} ${lastName}`, value: _id }));
};
