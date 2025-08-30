import axios from 'axios';


let base_url = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
// If running in Electron packaged app, use local backend
if (window && window.process && window.process.type) {
    base_url = 'http://localhost:3000';
}

console.log(base_url);

const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;