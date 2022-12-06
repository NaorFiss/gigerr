<template>
  <div class="app-container home max-width-container ">
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
      return this.$store.getters.gigs
    },
    titleId() {
      return this.$route.params.title
    },
    isClicked() {
      return ((delivery) => {
        if (delivery === this.filterBy.delivery)
          return 'clicked'
      })
    }
  },
  created() {
    console.log(this.$route.path);
    // if( !this.$route.path === '/gig/filtered') 
    this.$store.dispatch({ type: 'loadGigs', })
    this.filterBy = { ...this.$route.query }
    this.filter()
  },
  methods: {
    filter(filterBy = this.filterBy) {
      console.log(filterBy)
      this.$router.push({ name: 'gig-app', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
    clearBudget() {
      this.filterBy.min = ''
      this.filterBy.max = ''
      this.filter()
    },
    close() {
      this.$emit("close");
    },
    search() {
      this.$emit('search', this.filterBy)
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.path == '/gig') this.filter(newValue.query)
      },
      deep: true
    },
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
  //       gig.price = +prompt('New price?', gig.price.basic)
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
    gigExploreFilter,

  }
}
</script>
