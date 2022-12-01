<template>
  <header ref="header" v-bind:style="{ position: stickyNav ? 'fixed' : 'static' }">
    <div class="hamburger">
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19">
        <rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect>
        <rect width="23" height="3" rx="1.5" fill="#555"></rect>
        <rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect>
      </svg>
    </div>
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
      <router-link class="loggedin-user" v-if="loggedInUser" :to="`/user/${loggedInUser._id}`">
        <img :src="loggedInUser.imgUrl" />
      </router-link>
      <router-link v-if="!loggedInUser" class="join" to="/signup">Join</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  // methods: {
  //   onHeaderObserved(entries) {
  //     entries.forEach((entry) => {
  //       this.stickyNav = entry.isIntersecting ? false : true;
  //     });
  //   },
  // },

  // mounted() {
  //   this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
  //     rootMargin: "-85px 0px 0px",
  //   });
  //   this.headerObserver.observe(this.$refs.header);
  // },

  // data: () => {
  //   return {
  //     // arrowRight: miscellaneous.arrowRight,
  //     // arrowLeft: miscellaneous.arrowLeft,
  //     headerObserver: null,
  //     stickyNav: false,
  //   };
  // },
}
</script>