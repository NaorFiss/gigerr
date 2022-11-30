<template>
  <header>
    <router-link to="/">
      <span role="img" aria-label="logo">Gigerr.</span>
    </router-link>
    <nav>
      <router-link to="/gig">Explore</router-link>
      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link>
      <!-- <section class="loggedin-user" v-if="loggedInUser"> -->
        <router-link class="loggedin-user" v-if="loggedInUser" :to="`/user/${loggedInUser._id}`">
          <!-- {{ loggedInUser.fullname }} -->
          <img :src="loggedInUser.imgUrl" />
        </router-link>
        <!-- <span>{{ loggedInUser.score.toLocaleString() }}</span> -->
      <!-- </section> -->
    </nav>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>