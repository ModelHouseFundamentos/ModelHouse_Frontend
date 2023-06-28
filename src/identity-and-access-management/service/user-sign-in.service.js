import http from "@/shared/services/http-common";
export class UserSignInService {
  signIn(data) {
    console.log(data);
    return http.post("/user/login", data);
  }
}
