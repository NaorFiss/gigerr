<template>
  <section class="main-container">
    <div class="main-content">
      <div class="main-layout">
        <div class="hero-wrapper flex column">
          <div class="hero-title ">
            <app-hero/>
            <h2 class="header-title">
              Find the perfect freelance
            </h2>
            <h2 class="header-title">
              services for your business
            </h2>
            <gig-filter />
          </div>
        </div>
        <div class="hero backgrounds">
        </div>
      </div>
    </div>
  </section>
  <div style="height:1000px"></div>
</template>

<script>
import appHero from '../cmps/app-hero.vue'
import gigFilter from '../cmps/gig-filter.vue'
export default {

  name: 'home',
  methods: {
    goToExplore() {
      this.$router.push('/gig')
    },
    async loadGigs() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy))
      console.log(filterBy)
      await this.$store.dispatch({ type: 'loadGigs', filterBy })
      this.goToExplore()
    },
    setFilter(tag) {
      this.filterBy.txt = tag
      this.loadGigs()
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    },
  },
  components: {
    gigFilter,
    appHero
  }
}
</script>
