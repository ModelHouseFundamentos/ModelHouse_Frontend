import axios from "axios";

export class ProjectListService {
    getProjectListByBusinessId(businessId){
        return axios.get(`http://localhost:3000/projects?businessId=${businessId}`);
    }
    getProjectById(projectId, businessId){
        return axios.get(`http://localhost:3000/projects?projectId=${projectId}&businessId=${businessId}`);
    }
}