<template>
  <div class="app-container home max-width-container ">
    <h2 v-if="filterTag">{{filterTag}}</h2>
    <gig-list :gigs="gigs" />
  </div>
</template>

<script>
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { getActionRemoveGig, getActionUpdateGig } from '../store/gig.store'

import gigFilter from '../cmps/gig-filter.vue'
import gigList from '../cmps/gig-list.vue'

export default {
  computed: {
    gigs() {
      return this.$store.getters.gigs
    },
    filterTag(){
      return this.$route.params.tag || 'All gigs in one place' 
    }
  },
  created() {
    // if( !this.$route.path === '/gig/filtered') 
    this.$store.dispatch({ type: 'loadGigs', })
  },
  components: {
    gigList,
    gigFilter,
  }
}
</script>
