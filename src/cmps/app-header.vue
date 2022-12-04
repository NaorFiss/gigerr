<template>
  <section ref="header">
    <header :style="{ backgroundColor: stickyNav && atHome() ? 'white' : '' }"
      :class="atHome() ? 'atHome' : 'atExplore'">
      <div class="hamburger">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19">
          <rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect>
          <rect width="23" height="3" rx="1.5" fill="#555"></rect>
          <rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect>
        </svg>
      </div>
      <router-link to="/">
        <span role="img" aria-label="logo">
          <img v-if="!stickyNav && atHome()" class="logo" src="@/assets/white-logo.svg" alt="">
          <img v-else class="logo" src="@/assets/logo.svg" alt="">
        </span>
      </router-link>
      <gig-filter  v-if="!atHome()" :atExplore="'atExplore'" @setFilter="setFilter"/>
      <nav :class="!stickyNav && atHome() ? 'white-links' : ''">
        <router-link to="/gig">Explore</router-link>
        <!-- <router-link to="/review">Reviews</router-link> -->
        <!-- <router-link to="/chat">Chat</router-link> -->
        <router-link v-if="!loggedInUser" to="/login">Sign In</router-link>
        <router-link class="loggedin-user" v-if="loggedInUser" :to="`/user/${loggedInUser._id}`">
          <img :src="loggedInUser.imgUrl" />
        </router-link>
        <router-link v-else class="join" to="/signup">Join</router-link>
      </nav>
    </header>
  </section>
</template>

<script>
import gigFilter from './gig-filter.vue'

export default {
  data() {
    return {
      headerObserver: null,
      stickyNav: false,
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    atHome() {
      return this.$route.path === '/' ? true : false
    },
    onHeaderObserved(entries) {
      entries.forEach((entry) => {
        this.stickyNav = entry.isIntersecting ? false : true;
      })
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
    }
  },
  mounted() {
    this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
      rootMargin: "0px 0px 0px",
    });
    console.log('here');
    this.headerObserver.observe(this.$refs.header);
  },
  components:{
    gigFilter
  }
}
</script>