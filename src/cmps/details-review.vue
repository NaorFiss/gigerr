<template>
    <div class="details-review flex align-center" v-if=gig>
        <div class="user-img-container">
            <img class="user-img" :src="gig.reviews[0].userImgUrl" />
        </div>
        <section class="main-details-review flex column">
            <p class="user-review-name fs14 mac-bold black">
                {{ gig.likedByUsers[0].username }}
            </p>
            <div class="user-review-country flex">
                <div class="country-flag">flag </div> |
                <p class="country-name">country n
                    ame</p>
            </div>
            <div class="performance-grade flex">
                <p class="clr-6 inline fs14"><span class="orange flex3"><span v-for="n in rate"
                            class="star-img">★</span> {{ gig.owner.rate }}</span></p> |
                <p class="review-date inline fs14 ">{{ date }} days ago</p>
            </div>
            <div class="review-txt">
                I am satisfied with my first experience on fiverr and with mohsinfancy. Communication was good, even
                though
                sometimes a
                bit short and informal. I am happy with the solid design skill, even if nothing extraordinary. You
                can tell
                he
                has his
                style or template but this is ok, as it fits well with what I was looking for. All in all very good
                price/performance
                ratio
            </div>
            <section class="helpful-container flex">
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