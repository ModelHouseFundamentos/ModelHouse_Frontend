<template>
    <div>
      <BusinessProfile :businessProfile="this.business"/>
      <div>
        <div style="width: 500px; height: 800px;position:relative;
        margin: 50px; padding: 50px;">
          <h1 style="font-size: 50px; text-transform: uppercase;">Projects</h1>
          <div class="card md:flex md:justify-content-center" style="width: 1000px;">
            <Galleria style="width: 100%;" :value="images" :responsiveOptions="responsiveOptions" :numVisible="4" containerStyle="min-width: 1000px"
                      :circular="true" :showItemNavigators="true">
              <template #item="slotProps">
                <img :src="slotProps.item.image" alt="project image" style="width: 100%; display: block" />
              </template>
              <template #thumbnail="slotProps">
                <img :src="slotProps.item.image" alt="project image" style="display: block; width: 150px; height:100px;" />
              </template>
              <template #caption="slotProps">
                <span class="text-xl mb-2 font-bold" style="justify-content: center;">{{ slotProps.item.title }}</span>
                <div @click="goToProjectDetail(slotProps.item.projectId)">
                  <Button label="READ MORE" style="background-color: #02AA8B;
                  border-color: #02AA8B; padding: 8px; margin-top: 30px;"/>
                </div>
              </template>
            </Galleria>
          </div>
        </div>

      </div>

    </div>
</template>
<script>
import {defineComponent, ref} from 'vue'
import {BusinessDetailService} from "@/request-service-management/service/business-detail.service";
import BusinessProfile from "@/public/components/business-profile.component.vue";
import {ProjectListService} from "@/request-service-management/service/project-list.service";
export default defineComponent({
  name: "detail",
  components: {BusinessProfile},
  data(){
    return {
      business: {
        address: '',
        description: '',
        image: '',
        name: '',
        phoneBusiness: '',
        webSite: '',
      },
      businessService: null,
      responsiveOptions: null,
      projectService: null,
      images: {
        image: '',
        title: '',
        alt: '',
        projectId: null,
      },

    }
  },
  beforeCreate() {
    this.responsiveOptions = ref([
      {
        breakpoint: '991px',
        numVisible: 4
      },
      {
        breakpoint: '767px',
        numVisible: 3
      },
      {
        breakpoint: '575px',
        numVisible: 1
      }
    ]);
    this.businessService = new BusinessDetailService();
    this.businessService.getBusinessByID(this.$route.params.id).then(res=>{
      this.business = res.data;
      console.log(res.data);
    })
  },
  mounted(){
    this.projectService = new ProjectListService();
    this.projectService.getProjectListByBusinessId(this.$route.params.id).then(res=>{
      this.images = res.data;
      console.log(res.data);
    });
  },
  methods: {
    goToProjectDetail(projectId){
      this.$router.push("/detail/" + this.$route.params.id + "/project-detail/" + projectId);
    }
  }

})
</script>

<style scoped>

</style>