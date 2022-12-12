<template>
  <div class="home main-layout pad-block-32">
    <gig-explore-filter />
    <gig-list :gigs="gigs" />
  </div>
</template>

<script>
import gigExploreFilter from '../cmps/gig-explore-filter.vue'
import gigFilter from '../cmps/gig-filter.vue'
import gigList from '../cmps/gig-list.vue'

export default {
  data() {
    return {
      filterBy: {
        min: '',
        max: '',
        delivery: '',
        tag: '',
        title: ''
      },
    }
  },

  computed: {
    gigs() {
      // console.log(this.$store.getters.gigs);
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
