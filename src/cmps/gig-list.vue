<template>
    <section >
        <ul class="gig-list">
            <gigPreview v-for="gig in gigs" :gig="gig" :key="gig._id"/>
        </ul>
    </section>
    <router-link to="/gig/edit">Add Gig</router-link>
</template>

<script>
import gigPreview from './gig-preview.vue';
export default {
    name: 'gig-list',
    props: {
        gigs: Array,
    },
    components:{
        gigPreview,
    }
}
</script>