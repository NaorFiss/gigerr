<template>
    <pre>{{ gig }}</pre>
    <div v-if=gig class="details-review flex column mb-24" v-for="review in gig.reviews">

        <!-- <div class="user-img-container"> -->
        <!-- </div> -->
        <h3 class="reviews-header">Reviews</h3>
        <div class="flex review-user-details">
            <img class="user-img" :src="review.userImgUrl" />
            <div class="flex column space">
                <!-- <p class="user-review-name fs14 mac-bold black">{{ likedByUsers.username }}</p> -->
                <div class="user-review-country flex">
                    <img class="country-flag" :src="review.countryFlag" />
                    <p class="country-name">review.countryName</p>
                </div>
            </div>
        </div>
        <section class="main-details-review flex column">
            <div class="performance-grade flex">
                <p class="clr-6 inline fs14"><span class="orange "><span v-for="n in rate" class="star-img">★</span> {{
                        gig.owner.rate
                }}</span></p>
                <p class="review-date inline fs14 "> | {{ date }} days ago</p>
            </div>
            <p class="review-txt mb-24">
                {{ review.txt }}
            </p>
            <section class="helpful-container flex ">
                <span class="helpful">helpful? </span>
                <div class="like">👍</div>
                <div class="yes">Yes </div>
                <div class="deslike">👎 </div>
                <div class="no">No</div>
            </section>

        </section>
    </div>
</template>
  
<script>
export default {
    props: {
        gig: Object,

    },
    computed: {
        rate() {
            return Math.trunc(+this.gig.reviews[0].rate)
        },
        date() {
            return Math.trunc((+this.gig.reviews[0].rate) - 2)

        },
    },
}
</script>