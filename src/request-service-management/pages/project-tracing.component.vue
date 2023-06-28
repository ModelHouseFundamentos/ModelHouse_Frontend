<script>
import {useField, useForm} from "vee-validate";
import {ProposalService} from "@/request-service-management/service/proposal.service";

export default {
  name: "ProjectTracing",
  data(){
    const { resetForm } = useForm();
    const { value, value1 } = useField('value', this.validateField);
    return {
      confirmation: false,
      resetForm: resetForm(),
      value: value,
      value1: value1,
      proposalService: null,
      proposal: null,
      activities: null,
      resources: null,
      requestId: null,
    }
  },
  created() {
    this.requestId = this.$route.params.id;
    this.proposalService = new ProposalService();
    this.proposalService.getProposal(this.requestId).then(res=>{
      this.proposal = res.data;
      console.log("PROPOSALS: ", this.proposal);
    });
    this.proposalService.getProjectActivity(this.requestId).then(res=>{
      this.activities = res.data;
      console.log("ACTIVITIES: ", this.activities);
    });
    this.proposalService.getProjectResource(this.requestId).then(res=>{
      this.resources = res.data;
      console.log("RESOURCES: ", this.resources);
    });
  }
}

</script>

<template>
  <div class="card flex justify-content-center" style="height: 400px; margin:200px 100px 0px 100px;">
    <form @submit.prevent="confirmation = true" class="flex flex-column gap-2" :reset="resetForm">
      <h1>Your current project</h1>
      <h3>Description</h3>
      <p>{{proposal.description}}</p>
      <h3>Price</h3>
      <p>PEN {{proposal.price}}</p>
      <div class="bkg">
        <h2>Activites</h2>
      </div>
      <ProgressBar :value="50"></ProgressBar>
      <br>
      <br>
      <div v-for="(activity, index) in activities" :key="index">

        <div style="display: flex; justify-content: space-between;">
          <p> <b>{{index+1}}.- </b> {{activity.description}}</p>
          <Button class="space"  icon="pi pi-check" rounded/>
        </div>

        <br><br>
      </div>
      <div class="bkg">
        <h2>Resources</h2>
      </div>
      <ProgressBar :value="50"></ProgressBar>
      <br>
      <br>
      <div v-for="(resource, index) in resources" :key="index">
        <div style="display: flex; justify-content: space-between;">
          <p> <b>Resource: </b> {{resource.description}}</p>
          <p> <b>Amount: </b> {{resource.quantity}}</p>
          <Button class="space"  icon="pi pi-check"  rounded/>
        </div>
        <br><br>
      </div>
    </form>
  </div>
</template>

<style scoped>
.title-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.draft-button {
  margin-top: 10px;
}
.bkg{
  background-color: #004A63;
  padding: 10px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  color: white;
}
.space{
  margin-left: 20px;
}
</style>