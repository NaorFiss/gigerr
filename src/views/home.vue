<template>
  <section class="main-container">
    <div class="main-content">
      <div class="main-layout">
        <div class="hero-wrapper flex column">
          <div class="hero-title ">
            <p>
              Find the perfect freelance services for your business
            </p>
            <gig-filter />
            <app-hero/>
            <!-- <div class="search-bar">
              <form class="flex">
                <input type="search" v-model="filterBy.txt" placeholder="Try building mobile app" value>
                <button class="submit" @click="loadGigs">search
                </button>
              </form>
            </div>
            <div class="flex justify-between items-center ">
              <p>Popular:</p>
              <a class="btn-filter" @click="setFilter('Website Design')">Website Design</a>
              <a class="btn-filter" @click="setFilter('WordPress')">WordPress</a>
              <a class="btn-filter" @click="setFilter('Logo-design')">Logo design</a>
              <a class="btn-filter" @click="setFilter('Video Editing')">Video Editing</a>
            </div> -->
          </div>
        </div>
        <div class="hero backgrounds">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appHero from '../cmps/app-hero.vue'
import gigFilter from '../cmps/gig-filter.vue'
export default {

  name: 'home',
  data() {
    return {
      filterBy: {
        txt: '',
        price: 0,
      },
    }
  },
  computed: {
  },
  created() {
  },
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
