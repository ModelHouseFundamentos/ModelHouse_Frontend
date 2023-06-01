import http from "@/shared/services/http-common";

export class BusinessDetailService {
    getBusinessByID(id){
        return http.get(`business_profile/profile/${id}`);
    }
}