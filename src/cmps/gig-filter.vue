<template>
    <section class="filter-container">
        <div class="hero-wrapper flex column">
            <div class="hero-title ">
                <div class="search-bar hide-600">
                    <form :class="!atExplore ? 'search-container' : 'search-container-explore'"
                        @submit.prevent="loadGigs()" role="link">
                        <!-- @submit.prevent="loadGigs(); navigate()" role="link"> -->
                        <input class="search-input " type="search" v-model="filterBy.title"
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
                        <router-link to="/explore" @click="setTagFilter('website design')">Website
                            Design</router-link>
                        <router-link to="/explore" @click="setTagFilter('wordpress')">WordPress</router-link>
                        <router-link to="/explore" @click="setTagFilter('logo design')">Logo
                            Design</router-link>
                        <router-link to="/explore" @click="setTagFilter('video editing')">Video
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
                min: '',
                max: '',
                delivery: '',
                tag: '',
                title: ''
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