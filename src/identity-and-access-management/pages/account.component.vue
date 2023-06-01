
<script>
export default {
    name: "account"
}

</script>
<template>
  <section>
      <router-link to="/sign-in">
          <div class="sign-in-btn">sign in</div>
      </router-link>
      <router-link to="/sign-up">
          <div class="sign-up-btn">sign up</div>
      </router-link>
  </section>
</template>

<style scoped>
*{
    list-style-type: none;
    text-decoration: none;
}
section{
    background: url("@/assets/account.png") no-repeat;
    background-size: cover;
    min-height: 700px;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
}
.sign-in-btn{
  background-color: #02AA8B;
    color: white;
}
.sign-up-btn{
    background-color: white;
    color: black;
}
.sign-in-btn, .sign-up-btn{
    border-radius: 15px;
    padding: 20px 100px;
    font-weight: 600;
    cursor: pointer;
    font-size: 20px;
    text-transform: capitalize;
}
router-link{

}
</style>