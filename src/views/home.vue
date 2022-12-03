<template>
  <section class="main-container">
    <div class="main-layout">
      <div class="hero-title ">
        <app-hero />
        <div class="hero-grid">
          <div class="mb-10 bold-font">
            <h2 class="header-title mb-10">Find the perfect  <span class="courgette"> freelance</span></h2>
            <h2 class="header-title">services for your business</h2>
          </div>
          <gig-filter />
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
