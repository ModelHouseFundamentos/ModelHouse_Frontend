import http from "@/shared/services/http-common";
export class UserProfile {
    searchUserProfile(userId) {
        return http.get(`/user/${userId}/user_profile`);
    }
}
