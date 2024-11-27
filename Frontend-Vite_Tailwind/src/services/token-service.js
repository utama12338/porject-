import { backendAxiosInstance, post, get} from "./api-handler";

export const accessToken = async (clientId, clientSecret) => {
    const payload = {
        client_id: clientId,
        client_secret: clientSecret
    }
    try {
        const result = await post('/approval/auth/get-token', payload, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const verifyToken = async (token) => {
    try {
        const result = await get('/approval/auth/verify', undefined, undefined, backendAxiosInstance, token);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}
