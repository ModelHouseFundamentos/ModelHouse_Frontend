<script >
  export default {
    name: "TechnicalSpecifications",
    props:{
      projects: {
        image: '',
        title: '',
        alt: '',
        projectId: Number,
        projectManager: {
          name: '',
          photo: '',
          description: '',
        },
        technicalSpecifications: {
          year: Number,
          type: "",
          duration: Number,
          location: "",
          landArea: Number,
          projectArea: Number,
          numFloors: Number,
          design: "",
          team: "",
          interiorDesign: "",
          devices: "",
        }
      },
    }
  }

</script>

<template>
  <div class="container">
    <h1 style="position:relative;
        margin: 0px 0px 60px 100px; font-size: 40px; text-transform: uppercase;">technical specifications</h1>
    <div style="width: 65%;  margin-left: 100px;">
      <p><b>Project's name: </b> {{projects.title}}</p>
      <p><b>Year of the project: </b> {{projects.technicalSpecifications.year}}</p>
      <p><b>Duration time: </b> {{projects.technicalSpecifications.duration}} días</p>
      <p><b>Location: </b> {{projects.technicalSpecifications.location}}</p>
      <p><b>Land Area: </b> {{projects.technicalSpecifications.landArea}} m^2</p>
      <p><b>Project Area: </b> {{projects.technicalSpecifications.projectArea}} m^2</p>
      <p><b># of floors: </b> {{projects.technicalSpecifications.numFloors}}</p>
      <p><b>Design: </b> {{projects.technicalSpecifications.design}}</p>
      <p><b>Team: </b> {{projects.technicalSpecifications.team}}</p>
      <p><b>Interior Design: </b> {{projects.technicalSpecifications.interiorDesign}}</p>
      <p><b># of IOT devices: </b> {{projects.technicalSpecifications.devices}}</p>
    </div>
  </div>
</template>

<style scoped>
.container{
  background-color: #007A84;
  color: white;
  padding: 70px;
}
p{
  font-size: 15px;
  line-height: 2.5;
  margin: 0;
}
</style>