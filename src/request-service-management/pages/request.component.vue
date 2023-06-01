<script>
import {RequestService} from "@/request-service-management/service/request.service";
import {ref} from "vue";

export default {
  name: "Request",
  data(){
    return {
      businessRequest: null,
      requests: null,
      businessId: null,
      active: ref(0),
    }
  },
  created() {
    this.businessRequest = new RequestService();
    this.businessRequest.getBusinessProfileByAccountId(JSON.parse(localStorage.getItem("account")).id).then(res=>{
      this.businessId = res.data.id;
      console.log(this.businessId);
      this.businessRequest.getRequestsByBusinessId(res.data.id).then(result=>{
        this.requests = result.data;
        console.log(this.requests);
      })
    });

  }
}

</script>

<template>
  <TabView v-model:activeIndex="active" style="margin: 150px 50px 0px 50px;" >
    <TabPanel style="background-color: cornflowerblue; padding: 10px 15px;" header="RECENT REQUESTS" >
      <div v-for="(item, index) in this.requests" :key="item.id" >
        <div v-if="item.status == 'IN_PROCESS'"
             style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); border-radius: 8px; width: 80%;
           height: 200px; margin-bottom: 30px;">
          <img alt="user profile image" :src="item.userProfile.image" style="max-height: 50px; width: 10%;"/>
          <p><b>Request created by </b> {{item.userProfile.firstName}}</p>
          <Button icon="pi pi-check" label="Save" />
        </div>
      </div>
    </TabPanel>
    <TabPanel style="background-color: yellowgreen; padding: 10px 15px;" header="COMING PROJECTS">
      <div v-for="(item, index) in this.requests" :key="item.id" >
        <div v-if="item.status == 'PENDING'"
             style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); border-radius: 8px; width: 80%;
           height: 200px; margin-bottom: 30px;">

          <img alt="user profile image" :src="item.userProfile.image" style="max-height: 50px; width: 10%;"/>
          <p><b>Request created by </b> {{item.userProfile.firstName}}</p>
          <Button icon="pi pi-check" label="Save" />
        </div>
      </div>
    </TabPanel>
    <TabPanel style="background-color: green; padding: 10px 15px;" header="IN PROCESS PROJECTS">
      <div v-for="(item, index) in this.requests" :key="item.id" >
        <div v-if="item.status == 'COMPLETED'"
             style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); border-radius: 8px; width: 80%;
           height: 200px; margin-bottom: 30px;">
          <img alt="user profile image" :src="item.userProfile.image" style="max-height: 50px; width: 10%;"/>
          <p><b>Request created by </b> {{item.userProfile.firstName}}</p>
          <Button icon="pi pi-check" label="Save" />
        </div>
      </div>
    </TabPanel>


  </TabView>
</template>

<style scoped>
</style>