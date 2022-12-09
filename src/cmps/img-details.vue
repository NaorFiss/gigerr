<template>
    <el-carousel class="details-carousel kkkkkkkkkkkk" height="400px" :interval="0" trigger="click"
        arrow-position="outside" arrow="always">
        <el-carousel-container>

            <el-carousel-item class="main-img" v-for="item in imgs" :key="item">
                <img :src="item" alt="">
            </el-carousel-item>
        </el-carousel-container>
        <ul class="flex gap-16 el-carousel__indicators el-carousel__indicators--horizontal">
            <li class=" el-carousel__indicator el-carousel__indicator--horizontal is-active" v-for="item in imgs"
                :key="item">
                <!-- <button class="el-carousel__button "> -->
                <img class="small-img" :src="item" alt="">
                <!-- </button> -->
            </li>
        </ul>
    </el-carousel>
</template>

<script>
export default {
    name: 'img-details',
    props: {
        imgs: Array
    },
    components: {
    }
}
</script>