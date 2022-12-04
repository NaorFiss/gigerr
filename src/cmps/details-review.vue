<template>
    <div class="details-review flex" v-if=gig>
        <div class="user-img-container"></div>
        <section class="main-details-review">
            <div class="user-review-name">
                {{ gig.likedByUsers[0].username }}
            </div>
            <div class="user-review-country">
                <div class="country-flag"></div>
                <p class="country-name"></p>
            </div>
            <div class="performance-grade">
                <div class="performance-stars"></div>
                <div class="performance-date"></div>
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
                <section class="helpful-container">
                    <span class="helpful">helpful?</span>
                    <div class="like"></div>
                    <div class="yes">Yes</div>
                    <div class="deslike"></div>
                    <div class="no">No</div>
                </section>
            </div>
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