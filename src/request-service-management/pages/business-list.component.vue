<template>
    <section>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText id="search" v-model="search" placeholder="Search" />
          <Button icon="pi pi-search" @click="onSearch" />
        </span>
    </section>
    <div class="card">
        <div v-for="business in businesses" :key="business.id" class="card-container-area" style="cursor:pointer">
            <Card style="min-height: 250px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" id="elevator">
              <template #header>
                <img :src= "business.image" class="imgArea" alt="Remodeling a particular area of your house"
                style="max-height: 250px;">
              </template>
              <template #title class="text-center"> {{business.name}}</template>
              <template #subtitle class="text-center">{{business.address}}</template>
              <template #content class="text-center">
                {{business.description}}
                  <Rating style="margin-top: 50px;" v-model="value" :cancel="false" :model-value="3" readonly/>
              </template>
              <template #footer>
                <div style="text-align: center">
                  <RequestForm style="padding: 0px; margin: 0px;" :businessId="business.id"
                               :businessName="business.name"/>
                  <Button class="button" @click="goIntoDetails(business.id)" icon="pi pi-caret-right" label="See More"
                          style="background-color:#004A63; border-color: #004A63;"/>
                </div>

              </template>
            </Card>
        </div>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
import {BusinessListService} from "@/request-service-management/service/business-list.service";
import { ref } from 'vue';
import RequestForm from "@/request-service-management/pages/request-form.component.vue";

export default defineComponent({
  name: "remodeler",
  components: {RequestForm},
    data() {
        return {
            searchService: null,
            businesses: null,
            search: null,
            value: null,
        }
    },
    created(){
        this.searchService = new BusinessListService();
        this.searchService.searchRemodeler().then(res=>{
            this.businesses = res.data;
            console.log(res.data ,"hola");
        });
        this.value = ref(null);
    },
    methods:{
        onSearch(){

        },
        goIntoDetails(id){
            this.$router.push("/detail/" + id);
        },
    }
})
</script>
<style scoped>
section{
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    position:  relative;
    top: 125px;
    margin: 0 auto;
    width: 50%;
}
.card{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 80px;
    height: 100px;
}

.card-container-area{
    margin: 100px 20px 30px 20px;
}
#search{
    width: 400px;
}
#elevator {
  transition: transform 0.1s ease;
}
#elevator:hover {
  transform: translateY(-5px);
  transform: scale(1.03);
}
.button{
  margin-left: 10px;
}
</style>