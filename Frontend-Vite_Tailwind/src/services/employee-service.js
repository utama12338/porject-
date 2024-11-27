import { approvalAxiosInstance, post } from "./api-handler";

export const checkGsbEmployee =  async (payload) => {
    try {
        const result = await post('/employee/check-status', payload, undefined, approvalAxiosInstance, undefined);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}