<template>
  <section class="main-container max-width-container ">
    <div class="main-layout">
      <div class="hero-title ">
        <app-hero />
        <div class="hero-grid">
          <div class="mb-10 bold-font">
            <h2 class="header-title mb-10">Find the perfect  <span class="courgette"> freelance</span></h2>
            <h2 class="header-title">services for your business</h2>
          </div>
          <gig-filter @setFilter="setFilter"/>
          <p class="img-names">Zack, Bar Owner</p>
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
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
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
