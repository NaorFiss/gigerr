<template>
    <div @click="setFilter(img.title)" v-for="img in imgs" class=" slider-img-container">
        <img class="img-home" :src="img.src" alt="">
        <p class="img-home-paragraph img-home-text fs14">{{ img.p }}</p>
        <h3 class="img-home-title img-home-text fs24">{{ img.title }}</h3>
    </div>
</template>

<script>
export default {
    name: 'img-hero',
    props: {
        imgs: Array
    },
    data() {
        return {
            filterBy: {
                tag: '',
            },
        }
    },
    components: {
    },
    methods: {
        setFilter(tag) {
            this.filterBy.tag=tag
            this.$router.push({ name: 'gig-app', query: { ...this.filterBy } })
            this.$store.commit({ type: 'setFilter', filterBy: { ...this.filterBy } })
        },
    }
}
</script>