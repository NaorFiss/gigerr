<template>
    <section class="main-container">
        <div class="hero-wrapper flex column">
            <div class="hero-title ">
                <h1>Im gig filter!!!!</h1>
                <p>
                    Find the perfect freelance services for your business
                </p>
                <div class="search-bar">
                    <form class="flex" @submit.prevent="loadGigs">
                        <input type="search" v-model="filterBy.txt" placeholder="Try building mobile app" value>
                        <button class="submit" >search
                        </button>
                    </form>
                </div>
                <div class="flex justify-between items-center ">
                    <p>Popular:</p>
                    <a class="btn-filter" @click="setFilter('app')">app</a>
                    <a class="btn-filter" @click="setFilter('Website Design')">Website Design</a>
                    <a class="btn-filter" @click="setFilter('WordPress')">WordPress</a>
                    <a class="btn-filter" @click="setFilter('Logo-design')">Logo design</a>
                    <a class="btn-filter" @click="setFilter('Video Editing')">Video Editing</a>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

export default {
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
        // goToExplore() {
        //     this.$router.push('/gig')
        // },
        async loadGigs() {
            const filterBy = JSON.parse(JSON.stringify(this.filterBy))
            console.log(filterBy)
            await this.$store.dispatch({ type: 'loadGigs', filterBy })
            // this.goToExplore()
        },
        setFilter(tag) {
            this.filterBy.tag = tag
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