import http from "@/shared/services/http-common";
export class ProposalService {
    createProposal(requestId, data) {
        return http.post(`/request/${requestId}/proposal`, data);
    }
    createProjectActivity(proposalId, data){
        return http.post(`/proposal/${proposalId}/project_activity`, data);
    }
    createProjectResource(proposalId, data){
        return http.post(`/proposal/${proposalId}/project_resource`, data);
    }
    getProposal(requestId) {
        return http.get(`/request/${requestId}/proposal`);
    }
    getProjectActivity(proposalId){
        return http.get(`/proposal/${proposalId}/project_activity`);
    }
    getProjectResource(proposalId){
        return http.get(`/proposal/${proposalId}/project_resource`);
    }
}
