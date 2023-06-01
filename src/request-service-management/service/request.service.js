import http from "@/shared/services/http-common";
export class RequestService{
    sendRequest(userId, businessId, data){
        return http.post(`/request/user/${userId}/business/${businessId}`, data)
    }
    getRequestsByBusinessId(businessId){
        return http.get(`/request/business/${businessId}`)
    }
    getBusinessProfileByAccountId(accountId){
        return http.get(`business_profile/account/${accountId}`)
    }
}