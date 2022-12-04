<template>
    <el-carousel class="details-carousel" height="400px" :interval="0" trigger="click" indicator-position="outside" arrow="always" >
        <el-carousel-item class="main-img" v-for="item in imgs" :key="item">
            <img :src="item" alt="">
        </el-carousel-item>
        <ul class="el-carousel__indicators el-carousel__indicators--horizontal">
            <li class="el-carousel__indicator el-carousel__indicator--horizontal is-active" v-for="item in imgs"
                :key="item">
                <button class="el-carousel__button">
                    <img class="small-img" :src="item" alt="">
                </button>
            </li>
        </ul>
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