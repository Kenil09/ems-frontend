import axios from 'axios';

const apiClient = () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };

    const instance = axios.create({
        baseURL: process.env.REACT_APP_LOCAL_API_URL,
        responseType: 'json',
        headers
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log('Api error catched by axios interceptor', error);
            if (error.response.status === 403 && error.response.statusText === 'Forbidden') {
                localStorage.clear();
                window.location.href = `/login`;
            }
            throw error;
        }
    );
    return instance;
};

export default apiClient;
