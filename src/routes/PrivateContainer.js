import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import apiClient from 'service/service';
import Page404 from 'views/404Page/Page404';
import { SetLeaveAccountModel } from 'views/Leave/SetLeaveAccountModel';

const PrivateContainer = ({ children, roles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [open, setOpen] = useState(true);
    const [childrens, setChildrens] = useState(true);
    const [userDetails, setUserDeatils] = useState({});
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    let newChildrenComponent;

    const isLeaveAlreadySetted = async () => {
        try {
            let user;
            if (token) {
                user = jwtDecode(token);
                const { data } = await apiClient().get(`/user/${user._id}`);
                console.log(data);
                if (!data?.user?.company?.configured && data?.user?.owner) {
                    setChildrens(false);
                } else {
                    setChildrens(true);
                }
            }
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    };
    console.log(newChildrenComponent, 'newChildrenComponent');
    useEffect(() => {
        checkAuth();
        isLeaveAlreadySetted();
    }, []);
    useEffect(() => {
        checkAuth();
        isLeaveAlreadySetted();
    }, [open]);

    const checkAuth = () => {
        if (token) {
            const user = jwtDecode(token);
            console.log(user, 'user');
            setUserDeatils(user);
            if (roles.includes(user?.role)) {
                setIsAuthenticated(true);
            }
        } else {
            navigate('/login');
        }
    };
    if (!childrens) {
        newChildrenComponent = (
            <SetLeaveAccountModel open={open} user={userDetails} setOpen={setOpen}>
                {children}
            </SetLeaveAccountModel>
        );
    } else {
        newChildrenComponent = children;
    }
    return isAuthenticated ? newChildrenComponent : <Page404 />;
};

export default PrivateContainer;
