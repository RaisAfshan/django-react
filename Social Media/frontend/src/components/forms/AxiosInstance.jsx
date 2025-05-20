import axios from 'axios'
const Baseurl = 'http://127.0.0.1:8000/'
const AxiosInstance = axios.create({
    baseURL:Baseurl,
    timeout:5000,
    headers:{
        "Content-Type":"application/json",
        accept:'application/json',

    }
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if(token){
            config.headers.Authorization = `Token ${token}` 
        }
        else{
        config.headers.Authorization = ``  // still enable us to request when we log in or when we don't need a register and still gett the correct response
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('token')
        }
    }

)

export default AxiosInstance



