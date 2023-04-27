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
    const navigate = useNavigate();
    let newChildrenComponent;

    console.log(newChildrenComponent, 'newChildrenComponent');
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const user = jwtDecode(token);
            const { data } = await apiClient().get(`/user/${user?._id}`);
            setUserDeatils(data?.user);
            if (!data?.user?.company?.configured && data?.user?.owner) {
                setChildrens(false);
            } else {
                setChildrens(true);
            }
            if (roles.includes(data?.user?.role)) {
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
