  <script>
  import {useField, useForm} from "vee-validate";
  import {ProposalService} from "@/request-service-management/service/proposal.service";
  import {RequestService} from "@/request-service-management/service/request.service";

  export default {
    name: "Proposal",
    data(){
      const { resetForm } = useForm();
      const { value, errorMessage, value1 } = useField('value', this.validateField);
      return {
        confirmation: false,
        resetForm: resetForm(),
        value: value,
        value1: value1,
        errorMessage: errorMessage,
        activities: [''],
        resources: [{ resource: '', amount: 0 }],
        amounts: [''],
        proposalService: null,
        requestId: null,
        proposalId: null,
        requestService: null,
      }
    },
    created() {
      this.proposalService = new ProposalService();
      this.requestService = new RequestService();
    },
    methods: {
      addActivity() {
        this.activities.push('');
      },
      removeActivity(index) {
        this.activities.splice(index, 1);
      },
      addResource() {
        this.resources.push({ resource: '', amount: 0 });
      },
      removeResource(index) {
        this.resources.splice(index, 1);
      },
      submitProposal(){;
        this.requestId = this.$route.params.id;
        this.proposalService.createProposal(this.requestId, {
          "description": this.value,
          "price": this.value1,
          "status": "PENDING",
          "isResponse": false
        }).then(res=>{
          console.log("PROPOSAL: ", res);
        this.proposalService.getProposal(this.requestId).then(res=>{
          this.proposalId = res.data.id;
          console.log("PROPOSAL ID: ", this.proposalId);
          this.activities.map(activity=>{
            this.proposalService.createProjectActivity(this.proposalId, {
              "status": "PENDING",
              "name": "-",
              "description": activity,
            }).then(result=>{
              console.log("ACTIVITY: ", result);
            })
          });
          this.resources.map(resource =>{
            this.proposalService.createProjectResource(this.proposalId, {
              "description": resource.resource,
              "quantity": resource.amount,
              "state": "string"
            }).then(result=>{
              console.log("RESOURCE: ", result);
            })
          });
        });
          // this.requestService.updateRequest(this.requestId, { "status": "IN_PROCESS"}).then(result => {
          //   console.log(result)
          // })
        this.$router.push("/remodeler");
        });

        // console.log(this.proposalId);



      },
    }
  }
  </script>

  <template>
    <div class="card flex justify-content-center" style="height: 400px; margin:200px 100px 0px 100px;">
      <form @submit.prevent="confirmation = true" class="flex flex-column gap-2" :reset="resetForm">
        <div class="title-container">
          <h1>Create your proposal</h1>
          <Button label="Save Draft" class="draft-button"/>
        </div>
          <span class="p-float-label">
              <Textarea id="value" v-model="value" :class="{ 'p-invalid': errorMessage }"
                        rows="4" cols="30" aria-describedby="text-error"
                        style="width: 100%; height: 300px;"/>
              <label for="value">Description</label>
          </span>
        <div><small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small></div>
        <div>
          <span class="p-float-label">

            <InputNumber :class="{ 'p-invalid': errorMessage }" id="price" v-model="value1" inputId="currency-us" mode="currency" currency="PEN" locale="en-PE" />
            <label for="price">Price</label>
          </span>
          <div><small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small></div>
        </div>
        <div class="bkg">
          <h2>Activites</h2>
          <Button icon="pi pi-plus" @click="addActivity" rounded severity="success"/>
        </div>
        <br>
        <br>
          <div v-for="(activity, index) in activities" :key="index">
            <InputText style="width: 144vh;" type="text" v-model="this.activities[index]" placeholder="activity"></InputText>

            <Button class="space" @click="removeActivity(index)" icon="pi pi-trash" severity="danger" rounded/>

            <br><br>
          </div>
        <div class="bkg">
          <h2>Resources</h2>
          <Button icon="pi pi-plus" @click="addResource" rounded severity="success"/>
        </div>
        <br>
        <br>
        <div v-for="(resource, index) in resources" :key="index">
          <InputText style="width: 110vh; margin-right: 20px;" type="text" v-model="this.resources[index].resource" placeholder="resource"></InputText>
          <InputNumber type="text" v-model="this.resources[index].amount" placeholder="amount"></InputNumber>
          <Button class="space" @click="removeResource(index)" icon="pi pi-trash" severity="danger" rounded/>
          <br><br>
        </div>

        <Button type="submit" label="Submit" style="background-color:#02AA8B; border-color: #02AA8B;
              margin-top: 30px; width: 30%;" @click="submitProposal"/>
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