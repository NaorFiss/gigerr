<template>
    <section class="filter-container">
        <div class="hero-wrapper flex column">
            <div class="hero-title ">
                <div class="search-bar mb-24">
                    <router-link to="/gig" custom v-slot="{ navigate }">
                        <form :class="!atExplore ? 'search-container' : 'search-container-explore'"
                            @submit.prevent="loadGigs(); navigate()" role="link">
                            <input class="search-input" type="search" v-model="filterBy.txt"
                                placeholder="Try building mobile app" value>
                            <button class="submit search-button fs18 ">
                                {{ !atExplore ? 'Search' : '' }}
                                <img v-if="atExplore" class="white-search" src="@/assets/svg/white-search.svg" alt="">
                            </button>
                        </form>
                    </router-link>

                </div>
                <div v-if="!atExplore" class="flex popular-tags-container">
                    <p>Popular : </p>
                    <div class="flex justify-between items-center inline filter-tags popular-tags">
                        <!-- <a class="btn-filter" @click="setFilter('')">All</a> -->
                        <!-- <a class="btn-filter" @click="setFilter('app')">app</a> -->
                        <router-link to="/gig" custom v-slot="{ navigate }">
                            <a class="btn-filter" @click="setFilter('Website Design');
                            navigate()" role="link">Website Design</a>
                        </router-link>
                        <router-link to="/gig" custom v-slot="{ navigate }">
                            <a class="btn-filter" @click="setFilter('WordPress');
                            navigate()" role="link">WordPress</a>
                        </router-link>
                        <router-link to="/gig" custom v-slot="{ navigate }">
                            <a class="btn-filter" @click="setFilter('Logo Design');
                            navigate()" role="link">Logo Design</a>
                        </router-link>
                        <router-link to="/gig" custom v-slot="{ navigate }">
                            <a class="btn-filter" @click="setFilter('Video Editing');
                            navigate()" role="link">Video Editing</a>
                        </router-link>
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
                txt: '',
                price: 0,
                tag: '',
            },
        }
    },
    methods: {
        async loadGigs() {
            const filterBy = JSON.parse(JSON.stringify(this.filterBy))
            this.$emit('setFilter', { ...filterBy })
            this.filterBy.tag = ''
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