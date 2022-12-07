<template>
  <div class="gap-16 flex column b-pad-25" v-if=gig>
    <h1 class="black">{{ gig.title }}</h1>
    <div class="seller-details flex align-center ">
      <img class="user-img" :src="gig.owner.imgUrl" />
      <p @click="userDetails" class="fs14 mac-bold black mini-username">{{ gig.owner.fullname }}</p> 
      <p class="fs14"> | {{ gig.owner.level }} Seller </p>
      <div>
        <p class="clr-6 inline fs14"><span class="orange flex3"><span v-for="n in rate" class="star-img">★</span> {{
            gig.owner.rate
        }}</span>(24)</p>
      </div>
    </div>
    <imgDetails :imgs="gig.imgUrl" class="el-carousel-details" />
  </div>
</template>

<script>
import imgDetails from './img-details.vue'

export default {
  props: {
    gig: Object
  },
  computed: {
    rate() {
      return Math.trunc(+this.gig.owner.rate)

    },
  },
  methods: {
    userDetails() {
      console.log(this.gig.owner._id);
      this.$router.push('/user/' + this.gig.owner._id)
    }
  },
  components: {
    imgDetails,
  }
}
</script>