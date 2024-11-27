import axios from 'axios';

const approvalBaseURL = `${import.meta.env.VITE_BACKEND_APPROVE_URL}/api/v1/approval`;
const backendBaseURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
const warningListBaseURL = `${import.meta.env.VITE_WARNING_LIST_URL}/api/v1/ola`;

const createAxiosInstance = (baseUrl) => {
      return axios.create({
        baseURL: baseUrl, // Replace with your API's base URL
        timeout: 10000, // Set a timeout limit
        headers: {
          'Content-Type': 'application/json',
          // Add any custom headers here
        }
    });
}


export const approvalAxiosInstance = createAxiosInstance(approvalBaseURL);
export const backendAxiosInstance = createAxiosInstance(backendBaseURL);
export const warningListAxiosInstance = createAxiosInstance(warningListBaseURL);

export const post = async (url, data, config, axiosInstance, token) => {
    try {
        if(token){
          axiosInstance.defaults.headers.common['Authorization'] = token;
        }
        const response = await axiosInstance.post(url, data, config);
        return response.data;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const get = async (url, params, config, axiosInstance, token) => {
    try {
        if(token){
          axiosInstance.defaults.headers.common['Authorization'] = token;
        }
        const response = await axiosInstance.get(url, {
            ...config,
            params,
        });
        return response.data;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const postGeneral = (url, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
      };

      if(token){
        axios.defaults.headers.common['Authorization'] = token;
      }
    
      return axios.post(url, data, {
        headers: headers,
      });
}

export const getGeneral = (url, params, token) => {
    const headers = {
        'Content-Type': 'application/json',
      };

      if(token){
        axios.defaults.headers.common['Authorization'] = token;
      }
    
      return axios.get(url, params, {
        headers: headers,
      });
}