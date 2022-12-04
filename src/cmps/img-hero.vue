<template>
    <el-carousel height="400px" :interval="0" trigger="click" indicator-position="outside">
        <el-carousel-item class="main-img" v-for="item in imgs" :key="item">
            <img :src="item" alt="">
        </el-carousel-item>
    </el-carousel>
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