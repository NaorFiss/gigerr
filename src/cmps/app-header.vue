<template>
  <section ref="header" class="main-layout full ">
    <header :style="{ backgroundColor: stickyNav && atHome() ? 'white' : '' }"
      :class="atHome() ? 'atHome' : 'atExplore'" >
      <div class="hamburger">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19">
          <rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect>
          <rect width="23" height="3" rx="1.5" fill="#555"></rect>
          <rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect>
        </svg>
      </div>
      <div class="flex align-center gap-32">
        <router-link to="/">
          <span role="img" aria-label="logo">
            <img v-if="!stickyNav && atHome()" class="logo" src="@/assets/white-logo.svg" alt="">
            <img v-else class="logo" src="@/assets/black-logo.svg" alt="">
          </span>
        </router-link>
        <gig-filter v-if="!atHome() || secondStickyNav && atHome()" :atExplore="'atExplore'" @setFilter="setFilter" />
      </div>
      <nav :class="!stickyNav && atHome() ? 'white-links' : ''">
        <router-link to="/explore" @click="exploreGo">Explore</router-link>
        <!-- <router-link to="/review">Reviews</router-link> -->
        <!-- <router-link to="/chat">Chat</router-link> -->

        <router-link v-if="!loggedInUser" to="/login">Sign In</router-link>
        <router-link v-if="!loggedInUser" class="join" to="/signup">Join</router-link>

        <el-dropdown v-if="loggedInUser" trigger="click" size="large">
          <div class="loggedin-user"><img :src="loggedInUser.imgUrl" /></div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToProfile">Profile</el-dropdown-item>
              <el-dropdown-item divided @click="doLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </nav>
    </header>
    <div class="second-header flex border-bottom" :class="atHome() ? 'atHome , second-header-home' : 'atExplore' , 
      secondStickyNav ? 'second-header-sticky' : ''" >
      <router-link to="/explore" @click="setTagFilter('Website Design')">Website
        Design</router-link>
      <router-link to="/explore" @click="setTagFilter('WordPress')">WordPress</router-link>
      <router-link to="/explore" @click="setTagFilter('Marketing')">Marketing</router-link>
      <router-link to="/explore" @click="setTagFilter('Business plan')">Business Plan</router-link>
      <router-link to="/explore" @click="setTagFilter('Analyst')">Analyst</router-link>
      <router-link to="/explore" @click="setTagFilter('Lifestyle')">Lifestyle</router-link>
      <router-link to="/explore" @click="setTagFilter('Computer')">Computer</router-link>
      <router-link to="/explore" @click="setTagFilter('Traveling')">Traveling</router-link>
      <router-link to="/explore" @click="setTagFilter('Coaching')">Coaching</router-link>
      <router-link to="/explore" @click="setTagFilter('Logo Design')">Logo
        Design</router-link>
      <router-link to="/explore" @click="setTagFilter('Video Editing')">Video
        Editing</router-link>
    </div>
  </section>
</template>

<script>
import gigFilter from './gig-filter.vue'
export default {
  data() {
    return {
      headerObserver: null,
      stickyNav: false,
      headerSecondObserver: null,
      secondStickyNav:false,
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    atHome() {
      return this.$route.path === '/'
    },
    goToProfile() {
      this.$router.push(`/user/${this.loggedInUser._id}`)
    },
    onHeaderObserved(entries) {
      entries.forEach((entry) => {
        this.stickyNav = entry.isIntersecting ? false : true;
      })
    },
    onSecondHeaderObserved(entries) {
      entries.forEach((entry) => {
        this.secondStickyNav = entry.isIntersecting ? false : true;
      })
    },
    setFilter(filterBy) {
      this.$router.push({ name: 'gig-app', query: { ...filterBy } })
      // this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
    exploreGo(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    setTagFilter(tag) {
      var filterBy = {}
      filterBy.tag = tag
      this.setFilter(filterBy)
    },
  },
  mounted() {
    this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
      rootMargin: "0px 0px 0px",
    })
    this.headerObserver.observe(this.$refs.header)

    this.headerSecondObserver = new IntersectionObserver(this.onSecondHeaderObserved, {
      rootMargin: "150px 0px 0px",
    })
    this.headerSecondObserver.observe(this.$refs.header)
  },
  components: {
    gigFilter
  }
}
</script>
