<template>
    <section v-if="gig" class="gig-details">
        <div>
            <h1>{{ gig.title }}</h1>
            <div>
                <img :src="gig.owner.imgUrl" />
                <router-link :to="'user/' + gig.owner._id">{{
                        gig.owner.fullname
                }}</router-link> |
                <p>{{ gig.owner.level }}</p>
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                (7)
            </div>
            <img :src="gig.imgUrl">
        </div>
        <section class="owner-review">
            <h1>What people loved about this seller</h1>
            <p>owner reviews</p>
        </section>
        <section class="gig-description">
            <h1>About this gig</h1>
            <p>{{ gig.description }}</p>
        </section>
        <div class="about-seller">
            <h1>About The Seller</h1>
            <div class="seller-info">
                <img :src="gig.owner.imgUrl">
                <h5>{{ gig.owner.fullname }}</h5>
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                <img src="../assets/star.jpg" />
                (53)
                <button>Contact Me</button>
            </div>
        </div>
        <section class="gig-reviews">
            <h1>reviews</h1>
        </section>
        <section class="gig-payment">
            <h2>owner msg</h2>
            <h1>{{gig.price.basic}}</h1>
            <p>mini desc</p>
            <p>{{gig.daysToMake}}</p>
            <p>feature1</p>
            <p>feature2</p>
            <p>feature3</p>
            <p>feature4</p>
            <button type="submit">Continue ({{gig.price.basic}})</button>
        </section>
        <section>
            <p>Contact Seller</p>
        </section>
    </section>
</template>

<script>
// import { gigService } from '../services/gig.service.js'
import { gigService } from '../services/gig.service.local.js'
import gigReview from "../cmps/gig-review.vue"
export default {
    name: 'gig-details',
    props:{
        gig:Object,
    },
    component: {
        gigReview,

    },
    data() {
        return {
            gig: null
        }
    },
    async created() {
        try {
            const { id } = this.$route.params
            const gig = await gigService.getById(id)
            this.gig = gig

        } catch (err) {
            console.error(err)
        }
    },

}
</script>