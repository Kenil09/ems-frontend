const adminPermission = (user) => {
    if (user?.role === 'admin') {
        return true;
    }
    return false;
};

const managerPermission = (user) => {
    const applicableRoles = ['admin', 'manager'];
    if (applicableRoles.includes(user?.role)) {
        return true;
    }
    return false;
};

const teamInchargePermission = (user) => {
    const applicableRoles = ['admin', 'manager', 'teamIncharge'];
    if (applicableRoles.includes(user?.role)) {
        return true;
    }
    return false;
};

export const departmentPermission = (user) => {
    return adminPermission(user);
};

export const userPermission = (user) => {
    return adminPermission(user);
};

export const designationPermission = (user) => {
    return adminPermission(user);
};

export const shiftPermission = (user) => {
    return adminPermission(user);
};

export const manualEntry = (user) => {
    return managerPermission(user);
};

export const taskPermission = (user) => {
    return teamInchargePermission(user);
};
