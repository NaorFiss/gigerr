<template>
    <section >
        <ul class="gig-list">
            <gigPreview v-if=gigs v-for="gig in gigs" :gig="gig" />
        </ul>
    </section>
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