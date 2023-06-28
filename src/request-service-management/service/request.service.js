import http from "@/shared/services/http-common";
export class RequestService {
  sendRequest(userId, businessId, data) {
    return http.post(`/user/${userId}/business/${businessId}/request`, data);
  }
  getRequestsByBusinessId(businessId, status) {
    console.log(`/request/business/${businessId}/status/${status}`);
    return http.get(`/business/${businessId}/status/${status}/request`);
  }
  getRequestsByUserId(userId, status) {
    return http.get(`/user/${userId}/status/${status}/request`);
  }
  updateRequest(requestId, data) {
    return http.put(`/request/${requestId}`, data);
  }
}
