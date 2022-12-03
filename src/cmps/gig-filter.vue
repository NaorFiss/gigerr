<template>
    <section class="filter-container">
        <div class="hero-wrapper flex column">
            <div class="hero-title ">
                <div class="search-bar mb-24">
                    <form :class="!atExplore ? 'search-container' : 'search-container-explore'" @submit.prevent="loadGigs">
                        <input class="search-input" type="search" v-model="filterBy.txt"
                            placeholder="Try building mobile app" value>
                        <button class="submit search-button fs18 ">
                            {{!atExplore ? 'Search' : ''}}
                            <img v-if="atExplore" class="white-search" src="@/assets/svg/white-search.svg" alt="">
                        </button>
                    </form>
                </div>
                <div v-if="!atExplore" class="flex popular-tags-container">
                    <p>Popular : </p>
                    <div class="flex justify-between items-center inline filter-tags popular-tags">
                        <!-- <a class="btn-filter" @click="setFilter('')">All</a> -->
                        <!-- <a class="btn-filter" @click="setFilter('app')">app</a> -->
                        <a class="btn-filter" @click="setFilter('Website Design')">Website Design</a>
                        <a class="btn-filter" @click="setFilter('WordPress')">WordPress</a>
                        <a class="btn-filter" @click="setFilter('Logo Design')">Logo design</a>
                        <a class="btn-filter" @click="setFilter('Video Editing')">Video Editing</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

export default {
    props :{
        atExplore : String
    },
    name: 'home',
    data() {
        return {
            filterBy: {
                txt: '',
                price: 0,
                tag: '',
            },
        }
    },
    methods: {
        goToExplore() {
            this.$router.push('/gig')
        },
        async loadGigs() {
            const filterBy = JSON.parse(JSON.stringify(this.filterBy))
            this.filterBy.tag = ''
            await this.$store.dispatch({ type: 'loadGigs', filterBy })
            // this.goToExplore()
        },
        setFilter(tag) {
            this.filterBy.tag = tag
            this.filterBy.txt = tag
            this.loadGigs()
        }
    },
    computed: {
        tags() {
            return this.$store.getters.tags
        },
    }
}
</script>