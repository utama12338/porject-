import { warningListAxiosInstance, backendAxiosInstance , post } from "./api-handler";

export const checkWarningList = async (payload, apiKey) => {
    try {
        const result = await post('/validation-th-list', payload, undefined, warningListAxiosInstance, apiKey);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const checkWarningListNew = async (payload, token) => {
    try {
        const result = await post('/approval-backend/get-all-warninglist', payload, undefined, backendAxiosInstance, token);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}
