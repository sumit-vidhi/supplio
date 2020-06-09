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
        getDashboardData: 'users/dashboard',
        creatDemand: 'demands/createEmptyDemand',
        demandList: 'demands/myList',
        demandAllList: 'demands/list',
        updateDemand: 'demands/update',
        getDemand: 'demands/get',
        duplicate: 'demands/duplicate',
        setting: 'settings/site',
        resetPassword: 'reset-password',
        editProfile: 'basic-information',
        agencyeditProfile: 'agency/completeProfile',
        getSubcategory: "master/getAllCategories",
        getAllSubcategory: "master/getAllSubCategoriesByParent",
        getdata: 'user/getProfile',
        getdashboradData: 'user/getdashboradData',
        updatePassword: 'user/updatePassword',
        imageUpload: 'user/imageUpload',
        resendEmail: 'user/resendEmail'
    }
};
