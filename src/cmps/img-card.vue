<template>
    <el-carousel class="carousel-container" :interval="0" trigger="click">
        <el-carousel-item class="main-img-container" v-for="item in imgs" :key="item">
            <img class="main-img" :src="item" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'img-card',
    props: {
        imgs: Array
    },
    // methods:{
    //     getImgUrl() {
    //         return new URL(`../imgs/hero-img/hero${this.idx }.jpg`, import.meta.url).href
    //     },
    // },  
    components: {
    }
}
</script>