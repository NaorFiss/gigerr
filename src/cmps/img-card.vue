<template >
    <section class="slide">
        <img :src="img" alt="">
    </section>
</template>

<script>
export default {
    name: 'gig-list',
    props: {
        img: String
    },
    components: {
    }
}
</script>