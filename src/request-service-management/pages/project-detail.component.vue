<script >
  import {ProjectListService} from "@/request-service-management/service/project-list.service";
  import ProjectManager from "@/public/components/project-manager.component.vue";
  import TechnicalSpecifications from "@/public/components/technical-specifications.component.vue";
  import {ref} from "vue";

  export default{
    name: "ProjectDetail",
    components: {TechnicalSpecifications, ProjectManager},
    data(){
      return {
        projectService: null,
        projects: {
          image: '',
          title: '',
          alt: '',
          projectId: null,
          projectManager: {
            name: '',
            photo: '',
            description: '',
          },
          technicalSpecifications: {
            year: null,
            type: "",
            duration: null,
            location: "",
            landArea: null,
            projectArea: null,
            numFloors: null,
            design: "",
            team: "",
            interiorDesign: "",
            devices: "",
          },
          gallery: ref([]),
        },
        activeIndex: ref(0),
        responsiveOptions: null,
        displayCustom: ref(false)
      }
    },
    beforeMount() {
      this.projectService = new ProjectListService();
      this.projectService.getProjectById(this.$route.params.projectId).then(res=>{
        this.projects = res.data;
        console.log(this.projects);
      })
      this.responsiveOptions = ref([
        {
          breakpoint: '1024px',
          numVisible: 5
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ]);
    },
    methods: {
      imageClick(index){
        this.activeIndex = index;
        this.displayCustom = true;
      }
    }
  }

</script>

<template>

  <div>
    <img :src="this.projects.image" alt="project image" style="width: 100%; height: 500px;">
    <div style="position: relative; bottom: 150px; left: 100px;
    font-size: 20px; color: white; text-transform: uppercase;
    word-spacing: 5px; font-weight: bolder;
    background-color: #004A63; width: 50%; padding: 15px;">{{this.projects.title}}</div>
  </div>

  <ProjectManager :projects="this.projects"/>
  <TechnicalSpecifications :projects="this.projects"/>
  <div class="container">
    <h1 style="position:relative;
        margin: 70px 0px 60px 100px; font-size: 40px; text-transform: uppercase;">gallery</h1>
    <div class="card flex justify-content-center" style="margin: 80px;">
      <Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="projects.gallery" :responsiveOptions="responsiveOptions" :numVisible="7"
                :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
        <template #item="slotProps">
          <img :src="slotProps.item" alt="gallery image" style="width: 600px; display: block" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item" alt="gallery image" style="display: block"/>
        </template>
      </Galleria>

      <div v-if="projects.gallery" class="box-grid">
        <div v-for="(image, index) of projects.gallery" :key="index" class="img-col">
          <img :src="image" alt="gallery image" style="cursor: pointer;width: 300px;" @click="imageClick(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.img-col{
  margin-bottom: 50px;
}
.container{
  padding: 70px;
}
</style>