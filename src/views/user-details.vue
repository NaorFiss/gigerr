<template>
  <section v-if="user" class="user-details-page">
    <about-seller class="about-seller flex column" :owner="user" />
    <!-- <div class="user-page-details"> -->

      <!-- <img style="max-width: 200px;" :src="user.imgUrl" />
      <ul>
        <h3> {{ user.fullname }}</h3>
        <li v-for="review in user.givenReviews" :key="review._id">
          {{ review.txt }}
          <router-link :to="`/user/${review.aboutUser._id}`">
            About {{ review.aboutUser.fullname }}
          </router-link>
        </li>
      </ul>
    </div> -->
    <button @click="doLogout">Logout</button>

    <details>
      <summary>Full JSON</summary>
      <pre>{{ user }}</pre>
    </details>
  </section>
</template>

<script>
// import {userService} from '../services/user.service'
import aboutSeller from "../cmps/about-seller.vue"

export default {

  data() {
    return {
      // user: null
    }
  },
  async created() {
    // const user = await userService.getById(id)
    // this.user = user
  },
  watch: {
    userId: {
      handler() {
        if(this.userId){
            this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
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
  },
  methods:{
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
  },
  components:{
    aboutSeller
  }
}
</script>