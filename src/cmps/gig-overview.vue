<template>
  <div>
    <h1>{{ gig.title }}</h1>
    <div class="seller-details">
      <img class="user-img" :src="gig.owner.imgUrl" />
      <router-link to="">{{
          gig.owner.fullname
      }}</router-link> |
      <img class="star-img" src="../assets/star.jpg" />
      <img class="star-img" src="../assets/star.jpg" />
      <img class="star-img" src="../assets/star.jpg" />
      <img class="star-img" src="../assets/star.jpg" />
      <img class="star-img" src="../assets/star.jpg" />
      (24)
    </div>
    <img class="img-fit" :src="gig.imgUrl">
  </div>
</template>

<script>
export default {
  props: {
    gig: Object
  }
}
</script>