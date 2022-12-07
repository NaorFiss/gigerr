<template>
  <div class="app-container home max-width-container ">
    <!-- <h2 v-if="filterTag">{{filterTag}}</h2> -->
    <gig-explore-filter />
    <gig-list :gigs="gigs" />
  </div>
</template>

<script>
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { getActionRemoveGig, getActionUpdateGig } from '../store/gig.store'
import gigExploreFilter from '../cmps/gig-explore-filter.vue'
import gigFilter from '../cmps/gig-filter.vue'
import gigList from '../cmps/gig-list.vue'

export default {
  data() {
    return {
      filterBy: {
        title: '',
        tags: 'all',
        delivery: 'all',

        min: 0,
        max: Infinity

      },
    }
  },

  computed: {
    gigs() {
      console.log(this.$store.getters.gigs);
      return this.$store.getters.gigs
    },
    // filterTag(){
    //   return this.$route.params.tag || 'All gigs in one place' 
    // },
    titleId() {
      return this.$route.params.title
    },
  },
  created() {
    // if( !this.$route.path === '/gig/filtered') 
    this.$store.dispatch({ type: 'loadGigs', })
    this.filterBy = { ...this.$route.query }
    this.filter()
  },
  methods: {
    filter(filterBy = this.filterBy) {
      this.$router.push({ name: 'gig-app', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
    
    close() {
      this.$emit("close");
    },
    
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.path == '/gig') this.filter(newValue.query)
      },
      deep: true
    },
  },
  components: {
    gigList,
    gigFilter,
    gigExploreFilter,

  }
}
</script>
