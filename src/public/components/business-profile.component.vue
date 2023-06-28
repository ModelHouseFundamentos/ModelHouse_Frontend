<script>
  import {ref} from "vue";

  export default {
    name: "BusinessProfile",
    props: {
      businessProfile: {
        address: String,
        description: String,
        image: String,
        name: String,
        phoneBusiness: String,
        webSite: String,
      }
    },
    data(){
      const value  = ref(null);
      return {
        value: value,
      }
    }
  }
</script>

<template>
  <h2 style="text-align: center; position:relative;
        margin: 200px 0px 60px 0px; font-size: 50px;">{{businessProfile.name}}</h2>
  <div class="" style="position:relative;
        margin: 50px; padding: 50px;">
    <div class="content">
      <img :src="businessProfile.image" alt="business logo choose"
           style="width: 300px; height: 200px; border-radius: 5px;"/>
    </div>
    <div class="sidebar">
      <div>
        <Rating v-model="value" :cancel="false" :model-value="3" class="custom-rating" readonly/>
        <p>{{businessProfile.address}}</p>
        <a :href="businessProfile.webSite" target="_blank">{{businessProfile.webSite}}</a>
        <p>(+51) {{businessProfile.phoneBusiness}}</p>
        <p>{{businessProfile.description}}</p>
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
p, a{
  font-size: 15px;
}
</style>