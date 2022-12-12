<template>
    <div v-if=gig class="details-review flex column mb-24" v-for="review in gig.reviews">
        <div class="flex review-user-details">
            <img class="user-img" :src="review.userImgUrl" />
            <div class="flex column space">
                <p class="user-review-name fs14 mac-bold black">{{ review.username }}</p>
                <div class="user-review-country flex">
                    <img class="country-flag" :src="review.countryFlag" />
                    <p class="country-name">{{ review.countryName }}</p>
                </div>
            </div>
        </div>
        <section class="main-details-review flex column">
            <div class="performance-grade flex">
                <p class="clr-6 inline fs14"><span class="orange mac-bold"><span v-for="n in  Math.round(review.rate)"
                            class="star-img">★</span> {{review.rate}}</span></p>
                <p class="review-date inline fs14 "> | {{ Math.trunc(review.rate - 2) }} days ago</p>
            </div>
            <p class="review-txt mb-24">{{ review.txt }}</p>
            <section class="helpful-container flex mac-bold fs14 black">
                <p class="helpful">Helpful?</p>
                <p class="like"><span></span> Yes</p>
                <p class="unlike"><span></span> No</p>
            </section>

        </section>
    </div>
</template>
  
<script>
export default {
    props: {
        gig: Object,
    },
}
</script>