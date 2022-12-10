<template>
    <section class="filter-container">
        <div class="hero-wrapper flex column">
            <div class="hero-title ">
                <div class="search-bar ">
                    <form :class="!atExplore ? 'search-container' : 'search-container-explore'"
                        @submit.prevent="loadGigs()" role="link">
                        <!-- @submit.prevent="loadGigs(); navigate()" role="link"> -->
                        <input class="search-input" type="search" v-model="filterBy.title"
                            placeholder="Try &quot;building mobile app&quot;" value>
                        <button class="submit search-button fs18 " @click="setTitleFilter(filterBy.title)">
                            {{ !atExplore ? 'Search' : '' }}
                            <img v-if="atExplore" class="white-search" src="@/assets/svg/white-search.svg" alt="">
                        </button>
                    </form>
                </div>

                <div v-if="!atExplore" class="flex popular-tags-container">
                    <p class="fs14 mac-bold">Popular: </p>
                    <div class="flex justify-between items-center inline filter-tags popular-tags">
                        <router-link to="/explore" @click="setTagFilter('Website Design')">Website
                            Design</router-link>
                        <router-link to="/explore" @click="setTagFilter('WordPress')">WordPress</router-link>
                        <router-link to="/explore" @click="setTagFilter('Logo Design')">Logo
                            Design</router-link>
                        <router-link to="/explore" @click="setTagFilter('Video Editing')">Video
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

            },
        }
    },
    methods: {
        async loadGigs() {
            this.$emit('setFilter', { ...this.filterBy })
            // this.filterBy.tag = ''
            // this.$router.push('/explore')
        },
        setTagFilter(tag) {
            this.filterBy.tag = tag
            this.loadGigs()
        },
        setTitleFilter(title) {
            this.filterBy.title = title
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