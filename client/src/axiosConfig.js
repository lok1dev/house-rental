import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // Gắn token vò header
        let token =
            window.localStorage.getItem("persist:auth") &&
            JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(1, -1);
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Refresh Token
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
