<template>
    <div class="b-pad-25" v-if=owner>
        <h3 class="black b-pad-25 hide-detail fs20 mac-bold">About The Seller</h3>
        <div class="flex gap-16 b-pad-25 mini-user-info">
            <img class="user-details-img" :src="owner.imgUrl">
            <div class="seller-info flex column ">
                <p @click="userDetails" class="fs16 mac-bold  mini-username">{{ owner.fullname }}</p>
                <p>Quality is more important than quantity</p>
                <div>
                    <p class="clr-6 inline fs14"><span class="orange flex3 mac-bold"><span v-for="n in rate"
                                class="star-img">★</span> {{ owner.rate }}</span> (24)</p>
                </div>
                <button class="btn white-btn">Contact Me</button>
            </div>
        </div>
        <div class="seller-desc flex column b-pad-25 mb-24">
            <div class="seller-data flex wrap b-pad-25">
                <div class="from">
                    <p class="seller-header">From</p>
                    <h3>Israel</h3>
                    <!-- <h3>{{ owner.from }}</h3> -->
                </div>
                <div class="since">
                    <p class="seller-header">Member since</p>
                    <h3>Dec 2010</h3>
                    <!-- <h3>{{ owner.memberSince }}</h3> -->
                </div>
                <div class="from">
                    <p class="seller-header">Avg. response time</p>
                    <h3> 1 Hour</h3>
                </div>
                <div class="since">
                    <p class="seller-header">Last delivery</p>
                    <h3>12 hours</h3>
                </div>
            </div>
            <!-- <p class=" b-pad-25">{{ owner.about }}</p> -->
            <p class="b-pad-25 about-seller hide-detail">Hey There!
                My name is Wania Arif. I'm 23 years old passionate and highly skilled graphic designer working with
                skillful team of designers and developers. My passion is designing Illustrating new ideas making them
                come to life. I have been in this industry for more then 4 years. I will design for you a very
                high-quality, clean, and proffesional logo that stands out from other designs. I'm here to serve all my
                beautiful upcoming clients.</p>
        </div>
    </div>
</template>
    
<script>
export default {
    props: {
        owner: Object
    },
    computed: {
        rate() {
            // console.log(Math.trunc(+this.owner.rate))
            return Math.trunc(+this.owner.rate)
        },
    },
    methods: {
        userDetails() {
            this.$router.push('/user/' + this.owner._id)
        }
    },
    atUserPage(){
        console.log(this.$route.path);
      return this.$route.path === '/user/:id' ? true : false
    }
}
</script>