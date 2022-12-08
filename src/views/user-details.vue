<template>
  <div v-if="isYourProfile" class="user-details-header flex ">
    <button @click="myOrders = false; myCart = false">Profile</button>
    <button @click="myOrders = true ; myCart = false">Manage Orders</button>
    <button @click="myCart = true">Gigs</button>
  </div>
  <section v-if="user" class="user-details-page flex">
    <div v-if="(!myOrders && !myCart)" class="personal-user-details">
      <about-seller class="about-seller flex column mb-24" :owner="user" />
      <div class="about-seller ">
        <!-- <p class=" b-pad-25">{{ owner.about }}</p> -->
        <h4 class="black mb-24">Description</h4>
        <p class="b-pad-25 ">Hey There!
          My name is Wania Arif. I'm 23 years old passionate and highly skilled graphic designer working with
          skillful team of designers and developers. My passion is designing Illustrating new ideas making them
          come to life. I have been in this industry for more then 4 years. I will design for you a very
          high-quality, clean, and proffesional logo that stands out from other designs. I'm here to serve all my
          beautiful upcoming clients.</p>
      </div>
    </div>

    <div v-if="(!myOrders && !myCart)" class="flex-grow">
      <div v-if="userGigsList.length" class="user-details-section">
        <div class="flex space ">
          <p class="mac-semi">{{ whosProfile }}</p>
          <router-link v-if="(isYourProfile)" to="/gig/edit" class="btn green-btn add-btn-small">Create new gig</router-link>
        </div>
        <gigList :gigs="userGigsList" />
      </div>

      <div class="create-new-gig flex column" v-if="(!isLoading && isYourProfile && !userGigsList.length)">
        <img class="create-gig-img" src="@/assets/svg/create-gig.svg" alt="">
        <p>It seems that you don't have any active Gigs</p>
        <router-link to="/gig/edit" class="btn green-btn add-btn">Create a new Gig</router-link>
      </div>
    </div>

    <div v-if="(myOrders && !myCart)" class="order-table-container">
      <h1 class="mb-24">Manage Seller Orders</h1>
      <ordersTable :orders="sellerOrders" />
    </div>

    <div v-if="myCart" class="order-table-container">
      <h1 class="mb-24">Your Buyer orders</h1>
      <ordersTable :orders="buyerOrders" />
    </div>
  </section>
</template>

<script>
// import {userService} from '../services/user.service'
import gigList from '../cmps/gig-list.vue'
import aboutSeller from "../cmps/about-seller.vue"
import ordersTable from '../cmps/orders-table.vue'

export default {
  data() {
    return {
      userGigsList: [],
      isLoading: true,
      myOrders: false,
      myCart: false,
      buyerOrders: [],
      sellerOrders: []
    }
  },
  async created() {
    const sellerOrders = await this.$store.dispatch({ type: 'getSellerOrders' })
    this.sellerOrders = sellerOrders
    const buyerOrders = await this.$store.dispatch({ type: 'getBuyerOrders' })
    this.buyerOrders = buyerOrders
  },
  watch: {
    userId: {
      async handler() {
        if (this.userId) {
          this.userGigsList = []
          await this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
          this.$store.getters.watchedUser.gigs.forEach(async ({ _id }) => {
            const gig = await this.$store.dispatch({ type: 'getGigById', _id })
            this.userGigsList.push(gig)
          })
          this.isLoading = false
        }
      },
      immediate: true,
    },
  },
  computed: {
    user() {
      return this.$store.getters.watchedUser
    },
    userId() {
      return this.$route.params.id
    },
    isYourProfile() {
      return this.$store.getters.loggedinUser?._id === this.$store.getters.watchedUser?._id
    },
    whosProfile(){
      console.log(this.user.fullname);
      return this.isYourProfile ? 'My Active Gigs' : this.user.fullname + `'s Gigs`
    }
  },
  components: {
    aboutSeller,
    gigList,
    ordersTable,
  }
}
</script>