import React from 'react'
import axios from 'axios'
const AxiosInstance = axios.create({
    baseURL:'http://localhost:8080'
})
AxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default AxiosInstance