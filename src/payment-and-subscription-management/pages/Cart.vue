<script>
import axios from "axios";
export default {
  name: "cart",
  props: ['baseURL'],
  data() {
    return {
      stripeAPIToken : "pk_test_51NFT1pHntTAJqB06co8fw50sJHQLtYXUSb9sqA7YH6f1JVPKmb6GwZNgi6dWrFMZYOmZNT61jrZMgrZ72egCi9rZ003aA4r8Ro",
      stripe: "",
      plans: [],
      checkoutBodyArray: [],
    };
  },
  methods:{

    fetchPlans(){
      axios.get("http://localhost:8080/api/v1/plans")
          .then(response => {
            this.plans = response.data;
          }).catch(error=>{
        console.error(error);
      });
    },

    goToCheckout(plan){

      const checkoutBody = {
        planId: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price
      };

      this.checkoutBodyArray.push(checkoutBody);

      console.log('checkoutBodyArray', this.checkoutBodyArray);

      axios.post('http://localhost:8080/api/v1/order/create-checkout-session',this.checkoutBodyArray)
          .then((response) => {
            localStorage.setItem('sessionId', response.data.sessionId);
            console.log("session", response.data);
            this.stripe.redirectToCheckout({sessionId: response.data.sessionId});
          }).catch((err)=> console.log(err));

    },

  },

  mounted() {
    this.stripe = window.Stripe(this.stripeAPIToken);
    this.fetchPlans();
  },
};
</script>

<template>
  <div class="subscription-container">

    <div class="card flex align-items-center justify-content-center cardContent" >
      <Card v-for="plan in plans" :key="plan.id" style="width: 25em">
        <template #header>
          <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
        </template>
        <template #title> {{ plan.name }} </template>
        <template #subtitle> {{'🗸 '+ plan.description}} </template>
        <template #content>
          <p></p>
        </template>
        <template #footer>
          <Button @click="goToCheckout(plan)">
            {{ 'USD ' + plan.price + '/Monthly' }}
          </Button>
        </template>
      </Card>
    </div>


  </div>


</template>

<style scoped>

.subscription-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.cardContent{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
}

</style>