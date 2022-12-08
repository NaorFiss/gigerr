<template>
    <section class="filter-container">
        <div class="hero-wrapper flex column">
            <div class="hero-title ">
                <div class="search-bar ">
                    <form :class="!atExplore ? 'search-container' : 'search-container-explore'"
                        @submit.prevent="loadGigs()" role="link">
                        <!-- @submit.prevent="loadGigs(); navigate()" role="link"> -->
                        <input class="search-input" type="search" v-model="filterBy.txt"
                            placeholder="Try &quot;building mobile app&quot;" value>
                        <button class="submit search-button fs18 ">
                            {{ !atExplore ? 'Search' : '' }}
                            <img v-if="atExplore" class="white-search" src="@/assets/svg/white-search.svg" alt="">
                        </button>
                    </form>
                </div>

                <div v-if="!atExplore" class="flex popular-tags-container">
                    <p class="fs14 mac-bold">Popular: </p>
                    <div class="flex justify-between items-center inline filter-tags popular-tags">
                        <!-- <a class="btn-filter" @click="setFilter('')">All</a> -->
                        <!-- <a class="btn-filter" @click="setFilter('app')">app</a> -->
                        <router-link to="/explore/Website Design" @click="setFilter('Website Design')">Website
                            Design</router-link>
                        <router-link to="/explore/WordPress" @click="setFilter('WordPress')">WordPress</router-link>
                        <router-link to="/explore/Logo Design" @click="setFilter('Logo Design')">Logo
                            Design</router-link>
                        <router-link to="/explore/Video Editing" @click="setFilter('Video Editing')">Video
                            Editing</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

export default {
    props: {
        atExplore: String
    },
    name: 'home',
    data() {
        return {
            filterBy: {
                title: '',
                price: 0,
                tag: '',
            },
        }
    },
    methods: {
        async loadGigs() {
            const filterBy = JSON.parse(JSON.stringify(this.filterBy))
            this.$emit('setFilter', { ...filterBy })
            // this.filterBy.tag = ''
            // this.$router.push('/explore')
        },
        setFilter(tag) {
            this.filterBy.tag = tag
            this.filterBy.title = tag
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