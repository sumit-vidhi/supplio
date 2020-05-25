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
        emailCheck: 'user/emailValidation',
        creatDemand: 'demands/createEmptyDemand',
        updateDemand: 'demands/update',
        resetPassword: 'user/resetPassword',
        editProfile: 'basic-information',
        getSubcategory:"master/getAllSubCategories",
        getdata: 'user/getProfile',
        getdashboradData: 'user/getdashboradData',
        updatePassword: 'user/updatePassword',
        imageUpload: 'user/imageUpload',
        resendEmail: 'user/resendEmail'
    }
};
