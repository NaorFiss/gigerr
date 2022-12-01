<template>
  <div class="app-container home">
    <gig-filter />
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
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadGigs' })
  },
  // methods: {
  //   async removeGig(gigId) {
  //     try {
  //       await this.$store.dispatch(getActionRemoveGig(gigId))
  //       showSuccessMsg('Gig removed')

  //     } catch (err) {
  //       console.log(err)
  //       showErrorMsg('Cannot remove gig')
  //     }
  //   },
  //   async updateGig(gig) {
  //     try {
  //       gig = { ...gig }
  //       gig.price = +prompt('New price?', gig.price)
  //       await this.$store.dispatch(getActionUpdateGig(gig))
  //       showSuccessMsg('Gig updated')

  //     } catch (err) {
  //       console.log(err)
  //       showErrorMsg('Cannot update gig')
  //     }
  //   },
  // },
  components: {
    gigList,
    gigFilter,
  }
}
</script>
