<script>
  import {ref} from "vue";
  import {useToast} from "primevue/usetoast";
  import {useField, useForm} from "vee-validate";
  import {RequestService} from "@/request-service-management/service/request.service";
  export default {
    name: "RequestForm",
    props:{
      businessId: Number,
      businessName: '',
    },
    data(){
      const { handleSubmit, resetForm } = useForm();
      const { value, errorMessage } = useField('value', this.validateField);
      return {
        toast: useToast(),
        handleSubmit: handleSubmit,
        resetForm: resetForm(),
        value: value,
        errorMessage: errorMessage,
        visible: ref(false),
        requestService: null,
        request: null,
        requestTo: '',
        visibleConfirmation: ref(false),
        authorizationDialog: false,
        sameBusinessDialog: false,
      }
    },
    created() {
      this.requestService = new RequestService();
      this.requestTo = `Send a request to ${this.businessName}`
    },
    methods: {
     validateField(value) {
      if (!value) {
        return 'Description is required.';
      }
        return true;
      },
      onSubmit(){
          if (this.value) {
            console.log(JSON.parse(localStorage.getItem("account")).id);
            this.requestService.sendRequest(JSON.parse(localStorage.getItem("account")).id, this.businessId, {
              "status": "PENDING",
              "description": this.value,
              "accepted": false
            }).then(res=>{
              this.request = res.data;
              console.log(res.data);
            });
            this.value = '';
            this.visible=false;
            this.toast.add({severity: 'success', summary: 'Request Submitted', detail: this.value, life: 3000});
          }
      },
      openDialog() {
        if (localStorage.getItem("account") == undefined){
          this.authorizationDialog = true;
        }
        else{
          this.visible = true;
        }
      },
    }
  }
</script>
<template>
    <Button class="button" icon="pi pi-send" label="Send Request"
                style="background-color:#02AA8B; border-color: #02AA8B;"  @click="openDialog"/>
    <Dialog v-model:visible="authorizationDialog" modal header="You are not linked to an account" :style="{ width: '20vw' }">
      <template #footer>
        <p>Please</p>
        <router-link to="/sign-in" style="text-decoration: none; color: black;">Sign-In</router-link>
        <span> or </span>
        <router-link to="/sign-up" style="text-decoration: none;  color: black;">Sign-Up</router-link>
      </template>
    </Dialog>
    <Dialog v-model:visible="visible" modal :header="this.requestTo" :style="{ width: '50vw'}">
      <div class="card flex justify-content-center" style="height: 400px; margin-top:20px;">
        <form @submit.prevent="visibleConfirmation = true" class="flex flex-column gap-2" :reset="resetForm">
        <span class="p-float-label">
            <Textarea id="value" v-model="value" :class="{ 'p-invalid': errorMessage }"
                      rows="4" cols="30" aria-describedby="text-error"
                      style="width: 100%; height: 300px;"/>
            <label for="value">Description</label>
        </span>
          <div><small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small></div>
          <Button type="submit" label="Submit" style="background-color:#02AA8B; border-color: #02AA8B;
            margin-top: 30px; width: 30%;"/>
        </form>
      </div>
      <Dialog v-model:visible="visibleConfirmation" modal header="Are you sure?" :style="{ width: '20vw' }">
        <template #footer>
          <Button label="No" icon="pi pi-times" @click="visibleConfirmation = false" text />
          <Button label="Yes" icon="pi pi-check" @click="onSubmit" autofocus />
        </template>
      </Dialog>
    </Dialog>
    <Toast />
</template>

<style scoped>
button{
  margin-right: 20px;
}
</style>