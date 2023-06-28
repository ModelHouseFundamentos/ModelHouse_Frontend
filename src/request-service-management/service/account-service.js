import http from "@/shared/services/http-common";

export class AccountService {
    accountById(id){
        return http.get( `/account/${id}`)
    }
    accountByUserId(userId){
        return http.get(`/user/${userId}/account`)
    }
}