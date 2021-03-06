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
        getPcl: 'pcl',
        getPsl: 'psl',
        genrateDocument: 'documents/generateDocument',
        documentList: 'documents/list',
        getDashboardData: 'users/dashboard',
        agencyProfile: 'agency/getAgencyProfile',
        addReview: 'review/create',
        addComplete: 'demands/complete',
        creatDemand: 'demands/createEmptyDemand',
        hireAgency: 'proposal/accept',
        demandList: 'demands/myList',
        getPlan: 'packages/getAll',
        addsubscription: 'subscription/add',
        addbid: 'proposal/create',
        getWallet: 'wallet/get',
        addWallet: 'wallet/add',
        demandAllList: 'demands/list',
        delete: 'file/delete',
        agencydelete: 'agency/awards/delete',
        teamdelete: 'agency/team/delete',
        updateDemand: 'demands/update',
        getDemand: 'demands/get',
        duplicate: 'demands/duplicate',
        setting: 'settings/site',
        resetPassword: 'reset-password',
        editProfile: 'basic-information',
        agencyeditProfile: 'agency/completeProfile',
        getSubcategory: "master/getAllCategories",
        getAllSubcategory: "master/getAllSubCategories",
        getdata: 'user/getProfile',
        getdashboradData: 'user/getdashboradData',
        updatePassword: 'users/changePassword',
        imageUpload: 'user/imageUpload',
        resendEmail: 'user/resendEmail'
    }
};
