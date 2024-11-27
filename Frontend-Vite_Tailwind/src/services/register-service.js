import { approvalAxiosInstance, post } from "./api-handler";

export const addRegister =  async (payload, token) => {
    try {
        const result = await post('/loan/all/registers', payload, undefined, approvalAxiosInstance, token);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const checkDuplicateRegister =  async (payload) => {
    try {
        const result = await post('/loan/check-regis-duplicate', payload, undefined, approvalAxiosInstance, undefined);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const cancelRegister =  async (payload) => {
    try {
        const result = await post('/loan/cancel-register', payload, undefined, approvalAxiosInstance, undefined);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const trackingRegister = async (payload) => {
    try {
        const result = await post('/loan/all/tracking', payload, undefined, approvalAxiosInstance, undefined);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}