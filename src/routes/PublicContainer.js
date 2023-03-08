import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const PublicContainer = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/');
            // check role here
            //set user to redux
        }
    };

    return children;
};

export default PublicContainer;
