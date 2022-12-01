<template>
  <div v-if=gig>
    <h1>{{ gig.title }}</h1>
    <div class="seller-details flex align-center">
      <img class="user-img" :src="gig.owner.imgUrl" />
      <router-link to="">{{ gig.owner.fullname }}</router-link> |
      <h3>{{ gig.owner.level }} Seller </h3>
      <img v-for="n in rate" class="star-img" src="../assets/star.jpg" />
      (24)
    </div>
    <imgCard :imgs="gig.imgUrl" class="el-carousel__container-d" />
  </div>
</template>

<script>
import imgCard from './img-card.vue'

export default {
  props: {
    gig: Object
  },
  computed: {
    rate() {
      console.log(Math.trunc(+this.gig.owner.rate))
      return Math.trunc(+this.gig.owner.rate)

    },
  },
  components: {
    imgCard,
  }
}
</script>