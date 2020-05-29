/**
 * @name appApiUrl
 * @description
 * This is config file, it include the api urls of the application
 * Define Settings the object way(based on requirement):
 * @example
 * {paramsName}:{value}
 * @constant appApiUrl
 * @type {CommonBase}
 */
import { CommonBase } from '@core/interfaces/common-base';
export const appApiUrl: CommonBase = {
    auth: {
        login: 'login',
        register: 'register',
        emailVerification: 'user/emailVerification',
        forgotPassword: 'forgot-password',
        emailCheck: 'users/emailValidation',
        creatDemand: 'demands/createEmptyDemand',
        demandList:'demands/myList',
        updateDemand: 'demands/update',
        getDemand: 'demands/get',
        resetPassword: 'reset-password',
        editProfile: 'basic-information',
        getSubcategory:"master/getAllSubCategories",
        getdata: 'user/getProfile',
        getdashboradData: 'user/getdashboradData',
        updatePassword: 'user/updatePassword',
        imageUpload: 'user/imageUpload',
        resendEmail: 'user/resendEmail'
    }
};
