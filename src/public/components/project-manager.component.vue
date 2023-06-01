<script >
  import RequestForm from "@/request-service-management/pages/request-form.component.vue";

  export default{
    name:"ProjectManager",
    components: {RequestForm},
    props: {
      projects: {
        image: '',
        title: '',
        alt: '',
        projectId: Number,
        projectManager: Object,
      },
    },
    data(){
      return{

      }
    }

  }
</script>

<template>
  <div class="box">
    <h1 style="position:relative;
        margin: 0px 0px 60px 100px; font-size: 40px; text-transform: uppercase;">project manager</h1>
    <h2 style="position:relative;
        margin: 0px 0px 60px 100px; font-size: 20px;">{{projects.projectManager.name}}</h2>
    <div class="container" style="position:relative;
        margin: 50px; padding: 50px;">
      <div class="content">
        <img :src="projects.projectManager.photo" alt="business logo choose"
             style="width: 300px; height: 350px;
           display: block; margin: 0 auto;" class="photo"/>
      </div>
      <div class="sidebar">
        <div>
          <p>{{projects.projectManager.description}}</p>
          <div style="
                    position: absolute; bottom: 10px; right: 30px;">
                <RequestForm/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden; /* Para limpiar el float */
//border: 2px solid black;
}

.content {
  width: 35%; /* Ancho del contenido principal */
  float: left; /* Flotar a la izquierda */
}

.sidebar {
  width: 65%; /* Ancho de la barra lateral */
  float: right; /* Flotar a la derecha */
  padding-left: 150px;
}
.custom-rating .p-rating-icon::before {
  color: red; /* Cambia el color de las estrellas a rojo */
}
p{
  font-size: 14px;
  text-align: justify;
  line-height: 2.5;
  margin: 0;
}
.photo{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}
.box{
  padding: 70px;
}
</style>