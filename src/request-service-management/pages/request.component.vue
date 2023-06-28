<script>
import {RequestService} from "@/request-service-management/service/request.service";
import {ref} from "vue";
import {BusinessListService} from "@/request-service-management/service/business-list.service";
import {AccountService} from "@/request-service-management/service/account-service";
import { useToast } from "primevue/usetoast";
import {UserProfile} from "@/request-service-management/service/user-detail.service";
import {ProposalService} from "@/request-service-management/service/proposal.service";

export default {
  name: "Request",
  data(){
    return {
      requestService: null,
      requestId: null,
      toast: useToast(),
      businessProfileService: null,
      accountService: null,
      requestsCompleted: null,
      requestsInProcess: null,
      requestsPending: null,
      requestsCanceled: null,
      businessId: null,
      visibleAccepted: ref(false),
      visibleReject: ref(false),
      active: ref(0),
      userProfileService: null,
      accountRole: null,
      status: null,
      proposalService: null,
      isProposalActive: false,
      business: null,
    }
  },
  created() {
    this.businessProfileService = new BusinessListService();
    this.requestService = new RequestService();
    this.accountService = new AccountService();
    this.accountRole = JSON.parse(localStorage.getItem("account")).role;
    if(this.accountRole == "business"){
      this.searchRequest();
    }else{
      this.searchRequestUser();
    }
    this.proposalService = new ProposalService();
    this.proposalService.getProposal(this.requestId).then(res=>{
      console.log(res);
      this.isProposalActive = true;
    }).catch(err=>{
      this.isProposalActive = false;
      console.log(err);
    });
  },
  methods: {
    changeStatus(status){
      this.status = status;
    },
    goToProjectForm(id){
      this.$router.push("/project-update/" + id);
    },
    goToProjectTracingForm(id){
      this.$router.push("/project-tracing/" + id);
    },
    goToProposalForm(id){
      this.$router.push("/proposal/" + id);
    },
    onSubmitAccepted() {
      this.requestService.updateRequest(this.requestId, { "status": this.status}).then(result => {
        console.log(result)
      })
      this.accountRole=='business'?this.searchRequest():this.searchRequestUser();
      this.visibleAccepted = false;
      this.toast.add({ severity: 'success', summary: 'Request Accepted', detail: '', life: 3000 });
    },
    onSubmitReject() {
      this.requestService.updateRequest(this.requestId, { "status": this.status }).then(result => {
        console.log(result)
      })
      this.accountRole=='business'?this.searchRequest():this.searchRequestUser();
      this.visibleReject = false;
      this.toast.add({ severity: 'error', summary: 'Request Reject', detail: '', life: 3000 });
    },
    searchRequest() {
      this.accountService.accountByUserId(JSON.parse(localStorage.getItem("account")).id).then((res) => {
        console.log("holli");
        this.businessProfileService.searchBusinessProfile(res.data.id).then(res => {
          this.businessId = res.data.id;
          console.log(res.data);
          // FIRST STATUS
          this.requestService.getRequestsByBusinessId(res.data.id, "PENDING").then(result => {
            this.requestsPending = result.data;
            console.log(this.requestsPending);
          });
          // SECOND STATUS
          this.requestService.getRequestsByBusinessId(res.data.id, "PENDING_PROPOSAL").then(result => {
            this.requestsCompleted = result.data;
            console.log(this.requestsCompleted);
          });
          // THIRD STATUS
          this.requestService.getRequestsByBusinessId(res.data.id, "IN_PROCESS").then(result => {
            this.requestsInProcess = result.data;
            console.log(this.requestsInProcess);
          });
          // FOURTH STATUS
          this.requestService.getRequestsByBusinessId(res.data.id, "CANCELED").then(result => {
            this.requestsCanceled = result.data;
            console.log(this.requestsCanceled);
          });
        });
      })
    },
    searchRequestUser(){
      this.userProfileService  = new UserProfile();
      this.accountService.accountByUserId(JSON.parse(localStorage.getItem("account")).id).then((res) => {
        this.userProfileService.searchUserProfile(res.data.id).then(res => {
          this.businessId = res.data.id;
          this.business = res.data.name;
          console.log(res.data);
          // FIRST STATUS
          this.requestService.getRequestsByUserId(res.data.id, "PENDING").then(result => {
            this.requestsPending = result.data;
            console.log(this.requestsPending);
          });
          // SECOND STATUS
          this.requestService.getRequestsByUserId(res.data.id, "PENDING_PROPOSAL").then(result => {
            this.requestsCompleted = result.data;
            console.log(this.requestsCompleted);
          });
          // THIRD STATUS
          this.requestService.getRequestsByUserId(res.data.id, "IN_PROCESS").then(result => {
            this.requestsInProcess = result.data;
            console.log(this.requestsInProcess);
          });
          // FOURTH STATUS
          this.requestService.getRequestsByUserId(res.data.id, "CANCELED").then(result => {
            this.requestsCanceled = result.data;
            console.log(this.requestsCanceled);
          });
        });
      });
    }
  },
}

</script>

<template>
  <TabView v-model:activeIndex="active" style="margin: 150px 50px 0px 50px;" >
<!--    FIRST PANEL-->
    <TabPanel style="background-color: cornflowerblue; padding: 10px 15px;" header="RECENT REQUESTS" >
      <div class="cardRequest">
        <div v-for="(item, index) in this.requestsPending" :key="item.id" >
          <div class="contentCard">
            <div class="contentCardImg">
              <img alt="user profile image" :src="item.userProfile.image" style="height:150px; width: 150px; border-radius: 50%;"/>
            </div>
            <div class="contentCardText">
              <p v-if="this.accountRole == 'business'">
                <b >Request created by </b>
                {{ item.userProfile.firstName }}
              </p>
              <p v-if="this.accountRole == 'user'">
                <b>Request sent to </b>
                {{item.businessProfile.name}}
              </p>
              <p>{{item.description}}</p>
              <div v-if="this.accountRole == 'business'" class="buttonOptions">
                <Button class="btn" icon="pi pi-check" label="Accept" @click="visibleAccepted = true; requestId = item.id; changeStatus('PENDING_PROPOSAL')" />
                <Button class="btn" icon="pi pi-times" severity="danger" label="Reject" @click="visibleReject = true; requestId = item.id; changeStatus('CANCELED')" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
<!--    SECOND PANEL-->
    <TabPanel style="background-color: yellowgreen; padding: 10px 15px;" header="PENDING PROPOSALS">
      <div class="cardRequest">
          <div v-for="(item, index) in this.requestsCompleted" :key="item.id" >
            <div class="contentCard">
              <div class="contentCardImg">
                <img alt="user profile image" :src="item.userProfile.image" style="height:150px; width: 150px; border-radius: 50%;"/>
              </div>
              <div class="contentCardText">
                <p v-if="this.accountRole == 'business'">
                  <b >Request created by </b>
                  {{ item.userProfile.firstName }}
                </p>
                <p v-if="this.accountRole == 'user'">
                  <b>Request sent to </b>
                  {{item.businessProfile.name}}
                </p>
                <p>{{item.description}}</p>

                <Button v-if="this.accountRole=='business'" icon="pi pi-file" label="CREATE PROPOSAL" @click="goToProposalForm(item.id)"/>
                <Button v-if="this.accountRole=='user'" icon="pi pi-file" label="READ PROPOSAL" @click="goToProjectForm(item.id)"/>

                <br><br>
                <div class="buttonOptions" >
                  <Button v-if="this.accountRole=='user'" class="btn" icon="pi pi-check" label="Accept" @click="visibleAccepted = true; requestId = item.id; changeStatus('IN_PROCESS')" />
                  <Button class="btn" icon="pi pi-times" severity="danger" label="Reject" @click="visibleReject = true; requestId = item.id; changeStatus('CANCELED')" />
                </div>
              </div>
            </div>
          </div>
        </div>
    </TabPanel>
<!--    THIRD PANEL-->
    <TabPanel style="background-color: green; padding: 10px 15px;" header="IN PROCESS PROJECTS">
      <div class="cardRequest">
          <div v-for="(item, index) in this.requestsInProcess" :key="item.id" >
            <div class="contentCard">
              <div class="contentCardImg">
                <img alt="user profile image" :src="item.userProfile.image" style="height:150px; width: 150px; border-radius: 50%;"/>
              </div>
              <div class="contentCardText">
                <p v-if="this.accountRole == 'business'">
                  <b >Request created by </b>
                  {{ item.userProfile.firstName }}
                </p>
                <p v-if="this.accountRole == 'user'">
                  <b>Request sent to </b>
                  {{item.businessProfile.name}}
                </p>
                <Button v-if="this.accountRole=='business'" icon="pi pi-file" label="UPDATE PROJECT" @click="goToProjectForm(item.id)"/>
                <Button v-if="this.accountRole=='user'" icon="pi pi-file" label="FOLLOW PROJECT" @click="goToProjectTracingForm(item.id)"/>

              </div>
            </div>
          </div>
        </div>
    </TabPanel>
<!--    FOURTH PANEL-->
    <TabPanel style="background-color: green; padding: 10px 15px;" header="PROJECTS CANCELED">
      <div class="cardRequest">
        <div v-for="(item, index) in this.requestsCanceled" :key="item.id" >
          <div class="contentCard">
            <div class="contentCardImg">
              <img alt="user profile image" :src="item.userProfile.image" style="height:150px; width: 150px; border-radius: 50%;"/>
            </div>
            <div class="contentCardText">
              <p v-if="this.accountRole == 'business'">
                <b >Request created by </b>
                {{ item.userProfile.firstName }}
              </p>
              <p v-if="this.accountRole == 'user'">
                <b>Request sent to </b>
                {{item.businessProfile.name}}
              </p>
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
  </TabView>

<!--  DIALOGS-->
  <Dialog v-model:visible="visibleAccepted" modal header="Are you sure?" :style="{ width: '20vw' }">
    <template #footer>
      <Button label="No" icon="pi pi-times" severity="danger" @click="visibleAccepted = false" text />
      <Button label="Yes" icon="pi pi-check" severity="success" @click="onSubmitAccepted" autofocus />
    </template>
  </Dialog>
  <Dialog v-model:visible="visibleReject" modal header="Are you sure to reject?" :style="{ width: '20vw' }">
      <template #footer>
        <Button label="No" icon="pi pi-times" severity="success" @click="visibleReject = false" text />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="onSubmitReject" autofocus />
      </template>
    </Dialog>



<!--  TOASTS-->
  <Toast />
</template>

<style scoped>
.cardRequest{
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px;
  }
  .contentCardImg{
    width: 100%; 
    display: flex; 
    justify-content: center;
    padding-top: 25px;
  }
  .contentCardImg img{
    cursor: pointer;
  }
  .contentCard{
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); 
    border-radius: 8px;
    margin: auto auto 30px;
  }
  .contentCardText{
    width: 90%;
    margin: auto;
    padding: 25px 0;
  }
  .buttonOptions{
    display: inline-block;
  }
  .buttonOptions .btn{
    display: inline-block;
    margin: 0 3px;
  }
</style>