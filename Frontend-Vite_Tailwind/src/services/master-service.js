import { backendAxiosInstance, get, post } from "./api-handler";

export const getTitleName = async () => {
    try {
        const result = await get('/approval-backend/master/list-title-name', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const getRequsetLoanAmount = async (marketCode) => {
    try {
        if(marketCode){
            const result = await get(`/approval-backend/loan/get-loan-size/${marketCode}`, undefined, undefined, backendAxiosInstance, undefined);
            return result;
        }else{
            const result = await get('/approval-backend/loan/get-loan-size', undefined, undefined, backendAxiosInstance, undefined);
            return result;
        }

    } catch (error) {
        console.debug(error);
        throw error;
    }
}

export const getLonaObjective = async () => {
    try {
        const result = await get('/approval-backend/loan/get-loan-objective', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getLoanProduct = async (loanObjectiveCode) => {
    try {
        if(loanObjectiveCode){
            const result = await get(`/approval-backend/loan/get-loan-product/${loanObjectiveCode}`, undefined, undefined, backendAxiosInstance, undefined);
            return result;
        }else{
            const result = await get('/approval-backend/loan/get-loan-product', undefined, undefined, backendAxiosInstance, undefined);
            return result;
        }

    } catch (error){
        console.debug(error);
        throw error;
    }  
}

export const getEducation = async () => {
    try {
        const result = await get('/approval-backend/master/list-education', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }      
}

export const getMarital = async () => {
    try {
        const result = await get('/approval-backend/master/list-marital-status', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }  
}

export const getOccupation =  async () => {
    try {
        const result = await get('/approval-backend/master/list-occupation', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }  
}

export const getSubOccupation =  async (occupationMainCode) => {
    try {
        var result;
        if(occupationMainCode){
            result = await get('/approval-backend/master/list-sub-occupation/'+occupationMainCode, undefined, undefined, backendAxiosInstance, undefined);
        }else{
            result = await get('/approval-backend/master/list-sub-occupation/', undefined, undefined, backendAxiosInstance, undefined);
        }
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }  
}
 
export const getProvince = async () => {
    try {
        const result = await get('/approval-backend/master/list-province', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getProvinceForBranch = async () => {
    try {
        const result = await get('/approval-backend/master/list-province-branch', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getDistrict = async (province) => {
    try {
        var result;
        if(province) {
            result = await get('/approval-backend/master/list-district/'+province, undefined, undefined, backendAxiosInstance, undefined);
        }else{
            result = await get('/approval-backend/master/list-district', undefined, undefined, backendAxiosInstance, undefined);
        }
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getDistrictForBranch = async (province) => {
    try {
        var result;
        if(province) {
            result = await get('/approval-backend/master/list-district-branch/'+province, undefined, undefined, backendAxiosInstance, undefined);
        }else{
            result = await get('/approval-backend/master/list-district-branch', undefined, undefined, backendAxiosInstance, undefined);
        }
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}
export const getSubDistrict = async (district) => {
    try {
        var result;
        if(district){
            result = await get('/approval-backend/master/list-sub-district/'+ district, undefined, undefined, backendAxiosInstance, undefined);
        }else{
            result = await get('/approval-backend/master/list-sub-district/', undefined, undefined, backendAxiosInstance, undefined);
        }
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getResidentialType = async () => {
    try {
        const result = await get('/approval-backend/master/list-residential', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getResidentialStatus = async () => {
    try {
        const result = await get('/approval-backend/master/list-residential-status', undefined, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const getBranch = async (province, district) => {
    try {
        var result;
        if(province && district){
            result = await get(`/approval-backend/master/list-branch/${province}/${district}`, undefined, undefined, backendAxiosInstance, undefined);
        }else{
            result = await get('/approval-backend/master/list-branch', undefined, undefined, backendAxiosInstance, undefined);
        }
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}

export const generateAppNo = async (payload) => {
    try {
        const result = await post('/approval-backend/loan/generate-app-no', payload, undefined, backendAxiosInstance, undefined);
        return result;
    } catch (error){
        console.debug(error);
        throw error;
    }
}