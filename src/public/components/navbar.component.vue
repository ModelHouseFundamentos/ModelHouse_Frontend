<template>
    <header>
        <nav class="navbar">
            <div class="logo">
                <router-link to="/home">
                    <img src="../../assets/ModelHouseOfficialLogo.png" style="height: 50px;" alt="ModelHouse logo"/>
                </router-link>
            </div>
            <ul>
                <li class="navbar-link">
                    <router-link to="/remodeler">Find Remodeler</router-link>
                </li>

              <li class="navbar-link" v-if='this.accountData == "user"'>
                <router-link to="/request">MyRequests</router-link>
              </li>
              <li class="navbar-link" v-if='this.accountData == "business"'>
                <router-link to="/request">Requests</router-link>
              </li>

                <li class="navbar-link">
                    <router-link to="/home">
                        <i v-badge="2" class="pi pi-bell p-overlay-badge" />
                    </router-link>
                </li>
                <li class="navbar-link">
                    <router-link to="/home">
                        <i class="pi pi-heart" style="color: #708090"></i>
                    </router-link>
                </li>
                <li class="navbar-link" v-if='this.account' >
                  <router-link :to= 'this.routeProfile'>
                    <i class="pi pi-pencil" style="color: #708090"></i>
                  </router-link>
                </li>
                <li class="navbar-link" v-if='!this.account' >
                    <router-link to="/account">
                        <i class="pi pi-user" style="color: #708090" @click="userToggle($event)"></i>
                    </router-link>
                </li>
              <li class="navbar-link sign-out" v-if='this.account' @click="signOut()">
                <i class="pi pi-sign-out" style="color: #708090"></i>
              </li>


            </ul>
        </nav>
    </header>
  <TieredMenu style=" margin-top: 10px; width: 100px;" ref="menu" id="overlay_tmenu" :model="items" popup />
  <router-view></router-view>
</template>

<script>

import {ref} from "vue";

export default {
    name: "navbar",
    data() {
        return {
            account: false,
            accountData: null,
            routeProfile: "",
            badgeValue: Number,
            menu: null,
            items: ref([
            {
              label: 'File',
              icon: 'pi pi-fw pi-file',
            },
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',

            },
            {
              label: 'Users',
              icon: 'pi pi-fw pi-user',
            },
            {
              separator: true
            },
            {
              label: 'Quit',
              icon: 'pi pi-fw pi-power-off'
            }
          ]),
        }
    },
  beforeCreate() {
    this.badgeValue = 1;
  },
  created() {
        this.routeProfile = localStorage.getItem("account")? `/user/${JSON.parse(localStorage.getItem("account")).id}/user_profile`:"",
        localStorage.getItem("account") ? this.account = localStorage.getItem("account"): null;
        console.log(JSON.parse(this.account).id);
    this.accountData = localStorage.getItem("account")? JSON.parse(localStorage.getItem("account")).role:null;
    console.log(JSON.parse(this.account).role);
    },
    methods:{
        signOut() {
          localStorage.removeItem("account");
          this.$router.push('/home');
          setInterval("location.reload()", 50);
        },
        userToggle(event) {
          // Verifica que el TieredMenu esté definido antes de llamar a toggle
          if (this.menu) {
            this.menu.toggle(event);
          }
        },
    },
    mounted() {
        window.addEventListener("scroll", function (){
            const header = document.querySelector("header");
            header.classList.toggle("down",window.scrollY>0);
        });
        this.menu = this.$refs.menu;
    }
}



</script>

<style>
body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
</style>
<style scoped>
header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    transition: 0.7s;
    padding: 20px;
    z-index: 10;
    background-color: #004A63;
}
header.down{
    background: #ffffff;
    padding: 15px 20px;
}
.navbar {
    display: flex;
    justify-content: center;
    align-items: center;
}
.navbar-link{
    list-style-type: none;
    display: inline-block;
    padding: 0 10px;
}
.navbar-link a{
    color: white;
    text-decoration: none;
    font-weight: bold;
}

header.down .navbar,
header.down ul li a{
    color: black;
}
header .navbar ul li a i{
    position: relative;
    left: 15em;
}
.sign-out{
    position: relative;
    left: 15em;
    cursor: pointer;
}
.logo{
    position: relative;
    right: 20em;
}

</style>