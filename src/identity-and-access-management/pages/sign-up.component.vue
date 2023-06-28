<template>
    <section class="section-title-sign-up">
        <h1 class="title-of-sign-up">Model House</h1>
    </section>
    <section class="section-sign-up">
        <h1>Sign Up</h1>
    </section>

    <div class="form">
        <div class="email">
                <label for="email">Email Address</label>
                <InputText id="email" v-model="emailAddress" aria-describedby="email-help" :class="{ 'is-invalid': !isEmailValid }"/>
                <div v-if="!isEmailValid" class="invalid-feedback">Please enter a valid email address.</div>
        </div>
        <div class="password">
            <label for="password">Password</label>
            <InputText id="password" v-model="password"
                       aria-describedby="password-help" type="password"
                       :class="{'is-invalid': !passwordValid}" @input="validatePasswords"/>
            <div v-if="password && !passwordValid" class="invalid-feedback">
                At least 2 special characters and 8 characters</div>
        </div>
        <div class="confirm-password">
            <label for="confirm_password">Confirm Password</label>
            <InputText id="confirm_password" v-model="confirm_password"
                       aria-describedby="confirm-password-help" type="password"
                       :class="{'is-invalid': !confirmPasswordValid}" @input="validatePasswords"/>
            <div v-if="!passwordsMatch" class="invalid-feedback">Passwords do not match</div>
        </div>
        <div class="text-down">
          <div style="font-size: 12px;">
            you are agreeing to our <a style="color: black;" href="https://www.termsfeed.com/live/080d7040-ea41-438c-98a1-3f5c5eeb95f0"
                                       target="_blank"><b><u style="cursor: pointer;">privacy policy</u></b></a>
            and <a style="color: black;" href="https://www.termsfeed.com/live/a0ae1603-599a-4452-b149-e7c7223c77ae"
                   target="_blank"><b><u style="cursor: pointer;">terms of service.</u></b></a>
          </div>
          <div style="font-size: 12px;">you already have an account? <router-link to="/sign-in" style="color: black;"><b><u>Sign in</u></b></router-link></div>
        </div>
        <div @click="registerUser">
            <Button label="REGISTER" style="background-color: #02AA8B;
              border-color: #02AA8B; width: 400px;"/>
        </div>
    </div>
</template>
<script>
import {UserSignUpService} from "@/identity-and-access-management/service/user-sign-up.service";

export default {
    name: "project",
    data() {
        return {
            emailAddress: null,
            password: null,
            confirm_password: null,
            userService: null,
            passwordValid: false,
            confirmPasswordValid: false,
        }
    },
    created() {
        this.userService = new UserSignUpService();
    },
    computed: {
        isEmailValid() {
            // Email validation regex
            const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
            return regex.test(this.emailAddress);
        },
        passwordsMatch() {
            return this.password === this.confirm_password;
        },
    },
    methods: {
        registerUser() {
            this.password == this.confirm_password ?
                this.userService.register({
                    "emailAddress": this.emailAddress,
                    "password":  this.password
                }).then(res => {
                    console.log("user register succeed" , res.data);
                    this.$router.push({
                        name: "sign-in"
                    })
                })
                : null;
        },
        validatePasswords() {
            const passwordRegex = /^(?=.[!@#$%^&])(?=.{8,})/;
            this.passwordValid = passwordRegex.test(this.password);
            this.confirmPasswordValid = this.passwordValid && this.passwordsMatch;
        },
    },
    watch: {
        password() {
            this.validatePasswords();
        },
        confirmPassword() {
            this.validatePasswords();
        },
    },
}
</script>
<style scoped>
.is-invalid {
    border-color: red;
}
.invalid-feedback {
    color: red;
    font-size: 0.8rem;
}
h1{
    font-size: 38px;
    font-weight: 600;
    font-style: normal;
    line-height: 144px;
    padding: 0;
    margin: 10px;
}
.title-of-sign-up{
    font-size: 60px;
    font-weight: 600;
    font-style: normal;
    line-height: 144px;
    padding: 0;
}

.section-title-sign-up{
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    position:  relative;
    top: 80px;
    margin: 0 auto;
    width: 100%;
}

.section-sign-up{
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    position:  relative;
    top: 5px;
    margin: 0 auto;
    width: 50%;
}
.form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
label{
    display: block;
    padding: 0 0 10px 0;
}
.mail{
    position: relative;
    padding: 5px 0;
    margin: 35px 20px 5px 20px;
}

.password{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;
}
.confirm-password{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;

}
.text-down{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;
}

#email, #password, #confirm_password{
    width: 400px;
}

</style>