<template>
    <el-carousel  height="180px" :interval="0" trigger="click" >
        <el-carousel-item v-for="item in imgs" :key="item">
                <img :src="item" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'gig-list',
    props: {
        imgs: Array
    },
    components: {
    }
}
</script>