<template>
    <div class="b-pad-25" v-if=gig>
        <h3 class="black b-pad-25">About The Seller</h3>
        <div class="flex gap-16 b-pad-25">
            <img class="user-details-img" :src="gig.owner.imgUrl">
            <div class="seller-info flex column " >
                <h4>{{ gig.owner.fullname }}</h4>
                <p>Quality is more important than quantity</p>
                <div>
                    <img v-for="n in rate" class="star-img" src="../assets/star.jpg" />
                    <p class="clr-6 inline"><span class="orange  flex3">&#9733{{ gig.owner.rate }}</span>(24)</p>
                </div>
                <button class="btn white-btn">Contact Me</button>
            </div>
        </div>
        <div class="seller-desc flex column  b-pad-25">
            <div class="seller-data flex wrap  b-pad-25">
                <div class="from">
                    <h3 class="seller-header">From</h3>
                    <h3>{{ gig.owner.from }}</h3>
                </div>
                <div class="since">
                    <h3 class="seller-header">Member since</h3>
                    <h3>{{ gig.owner.memberSince }}</h3>
                </div>
                <div class="from">
                    <h3 class="seller-header">Avg. response time</h3>
                    <h3> 1 Hour</h3>
                </div>
                <div class="since">
                    <h3 class="seller-header">Last delivery</h3>
                    <h3>about 12 hours</h3>
                </div>
            </div>
            <p class=" b-pad-25">{{ gig.owner.about }}</p>
            <p class=" b-pad-25 about-seller">Hey There!
My name is Wania Arif. I'm 23 years old passionate and highly skilled graphic designer working with skillful team of designers and developers. My passion is designing Illustrating new ideas making them come to life. I have been in this industry for more then 4 years. I will design for you a very high-quality, clean, and proffesional logo that stands out from other designs. I'm here to serve all my beautiful upcoming clients.</p>
        </div>
    </div>
</template>
    
<script>
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
}
</script>