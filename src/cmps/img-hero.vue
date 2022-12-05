<template>
    <div v-for="img in imgs" class=" slider-img-container">
        <img class="img-home" :src="img.src" alt="">
        <p class="img-home-paragraph img-home-text fs14">{{img.p}}</p>
        <h3 class="img-home-title img-home-text fs24">{{img.title}}</h3>
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