<template>
  <div class="main-layout flex-grow user-details-main-container">
    <div v-if="isYourProfile" class="user-details-header-container full main-layout">
      <div class="user-details-header flex">
        <button @click="pageToShow = 'profile'; activeNav = 1" :class="activeNav === 1 ? 'active' : ''">Profile</button>
        <button @click="pageToShow = 'manageOrders'; activeNav = 2" :class="activeNav === 2 ? 'active' : ''">Manage
          Orders</button>
        <button @click="pageToShow = 'gigs'; activeNav = 3" :class="activeNav === 3 ? 'active' : ''">Gigs</button>
      </div>
    </div>
    <section v-if="user" class="user-details-page flex ">
      <div v-if="(pageToShow === 'profile')" class="personal-user-details">
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

      <div v-if="(pageToShow === 'profile')" class="flex-grow">
        <div v-if="userGigsList.length" class="user-details-section">
          <div class="flex space ">
            <p class="mac-semi">{{ whosProfile }}</p>
            <router-link v-if="(isYourProfile)" to="/gig/edit" class="btn green-btn add-btn-small">Create new
              gig</router-link>
          </div>
          <gigList :gigs="userGigsList" />
        </div>

        <div class="create-new-gig flex column" v-if="(!isLoading && isYourProfile && !userGigsList.length)">
          <img class="create-gig-img" src="@/assets/svg/create-gig.svg" alt="">
          <p>It seems that you don't have any active Gigs</p>
          <router-link to="/gig/edit" class="btn green-btn add-btn">Create a new Gig</router-link>
        </div>
      </div>

      <div v-if="(pageToShow === 'manageOrders')" class="order-table-container">
        <h1 class="mb-24">Earning</h1>
        <div>
          <ul class="flex income-table">
            <li>
              <p>Monthly Income</p>
              <h3>${{netIncome}}.00</h3>
            </li>
            <li>
              <p>Widthrawn</p>
              <h3>$20.00</h3>
            </li>
            <li>
              <p>Available For Widthrawn</p>
              <h3>${{(netIncome - 20)}}.00</h3>
            </li>
            <li>
              <p>Order Pending</p>
              <h3>{{pendingOrders}}</h3>
            </li>
          </ul>
        </div>
        <h1 class="mb-24">Manage Seller Orders</h1>
        <ordersTable :orders="sellerOrders" />
      </div>

      <div v-if="pageToShow === 'gigs'" class="order-table-container">
        <h1 class="mb-24">Your orders</h1>
        <ordersTable :orders="buyerOrders" />
      </div>
    </section>
  </div>
</template>

<script>
import {userService} from '../services/user.service'
import gigList from '../cmps/gig-list.vue'
import aboutSeller from "../cmps/about-seller.vue"
import ordersTable from '../cmps/orders-table.vue'

export default {
  data() {
    return {
      userGigsList: [],
      isLoading: true,
      buyerOrders: [],
      sellerOrders: [],
      activeNav: 1,
      pageToShow: 'profile',
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
    whosProfile() {
      return this.isYourProfile ? 'My Active Gigs' : this.user.fullname + `'s Gigs`
    },
    netIncome(){
      var complitedOrders = this.sellerOrders.filter(order => order.status === 'Completed')
      var income = complitedOrders.reduce((acc , order) => acc+ order.gig.price ,0)
      return income
    },
    pendingOrders(){
      var complitedOrders = this.sellerOrders.filter(order => order.status === 'Pending')
      return complitedOrders.length
    }
  },
  methods:{
    
  },  
  components: {
    aboutSeller,
    gigList,
    ordersTable,
  }
}
</script>