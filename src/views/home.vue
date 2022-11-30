<template>
  <section class="main-container">
    <div class="main-content">
      <div class="main-layout">
        <div class="hero-wrapper flex column">
          <div class="hero-title ">
            <p>
              Find the perfect freelance services for your business
            </p>
            <div class="search-bar">
              <form class="flex">
                <input type="search" placeholder="Try building mobile app" value>
                <button class="submit" @click="goToExplore">search
                </button>
              </form>
            </div>
            <div class="popular-gigs flex">" Popular"
              <ul class="flex">
                <li>Website Design</li>
                <li>WordPress</li>
                <li>Logo Design</li>
                <li>Video Editing</li>
              </ul>
            </div>
          </div>
          <div class="hero backgrounds">

          </div>
        </div>
      </div>
    </div>
  </section>



</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    goToExplore() {
      this.$router.push('/gig')
    }
  }

}
</script>
