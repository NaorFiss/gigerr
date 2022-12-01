<template>
  <header>
    <router-link to="/">
      <span role="img" aria-label="logo">
        <img class="logo" src="@/assets/logo.svg" alt="">
      </span>
    </router-link>
    <nav class="flex">
      <router-link to="/gig">Explore</router-link>
      <!-- <router-link to="/review">Reviews</router-link> -->
      <router-link to="/chat">Chat</router-link>
      <router-link v-if="!loggedInUser" to="/login">Sign In</router-link>
      <router-link v-if="!loggedInUser" class="join" to="/signup">Join</router-link>
      <router-link class="loggedin-user" v-if="loggedInUser" :to="`/user/${loggedInUser._id}`">
        <img :src="loggedInUser.imgUrl" />
      </router-link>
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