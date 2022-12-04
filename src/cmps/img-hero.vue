<template>
    <div v-for="img in imgs" class=" slider-img-container">
        <img class="img-home" :src="img" alt="">
    </div>
</template>

<script>
export default {
    name: 'img-hero',
    props: {
        imgs: Array
    },
    components: {
    }
}
</script>