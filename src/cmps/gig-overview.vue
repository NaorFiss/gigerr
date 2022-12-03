<template>
  <div class="gap-16 flex column b-pad-25"  v-if=gig>
    <h1>{{ gig.title }}</h1>
    <div class="seller-details flex align-center gap-16">
      <img class="user-img" :src="gig.owner.imgUrl" />
      <p @click="userDetails" class="fs14 mac-bold black mini-username">{{ gig.owner.fullname }}</p> |
      <p>{{ gig.owner.level }} Seller </p> 
      <div>
        <img v-for="n in rate" class="star-img" src="../assets/star.jpg" />
        <p class="clr-6 inline"><span class="orange  flex3">&#9733{{ gig.owner.rate }}</span>(24)</p>
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
      console.log(Math.trunc(+this.gig.owner.rate))
      return Math.trunc(+this.gig.owner.rate)

    },
  },
  methods:{
        userDetails(){
            console.log(this.gig.owner._id);
            this.$router.push('/user/'+ this.gig.owner._id)
        }
    },
  components: {
    imgDetails,
  }
}
</script>