<template>
  <section class="main-container max-width-container ">
    <div class="main-layout">
      <div class="hero-title ">
        <app-hero />
        <div class="hero-grid">
          <div class="mb-10 bold-font">
            <h2 class="header-title mb-10">Find the perfect <span class="courgette"> freelance</span></h2>
            <h2 class="header-title">services for your business</h2>
          </div>
          <gig-filter @setFilter="setFilter" />
          <p class="img-names">Zack, Bar Owner</p>
        </div>
      </div>
    </div>
  </section>
  <div style="height:1000px"></div>
  <div>
    <imgHero :imgs="gigsUrl" class="el-carousel-hero" />
  </div>
</template>

<script>
import appHero from '../cmps/app-hero.vue'
import gigFilter from '../cmps/gig-filter.vue'
import imgHero from '../cmps/img-hero.vue'
export default {

  name: 'home',
  created() {
    // if( !this.$route.path === '/gig/filtered') 
    this.$store.dispatch({ type: 'getGigsUrl', })
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
    }
  },
  computed: {
    gigsUrl() {
      console.log("gigsUrl", this.$store.getters.gigsUrl)
      return this.$store.getters.gigsUrl
    },
    tags() {
      return this.$store.getters.tags
    },

  },
  components: {
    gigFilter,
    appHero,
    imgHero
  }
}
</script>
