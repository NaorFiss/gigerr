<template>
    <section class="gig-details">
        <div>
            <h1>{{ gig.title }}</h1>
            <div>
                <img src="gig.owner.imgUrl" />
                <router-link to="'user/' + gig.owner._id">{{
                        gig.owner.fullname
                }}</router-link> |
                <p>{{ gig.owner.level }}</p>
                <!-- stars---owner:rate -->
                (7)
            </div>
            <img src="gig.imgUrl">
        </div>
        <section class="gig-description">
            <h1>About this gig</h1>
            <p>{{ gig.description }}</p>
        </section>
        <div class="about-seller">

        </div>
        <gig-review />
    </section>
</template>

<script>
import { gigService } from '../services/gig-service.js'
import gigReview from "../cmps/gig-review.vue"
export default {
    name: 'gig-details',
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
            const { _id } = this.$route.params
            const gig = await gigService.getById(_id)
            this.gig = gig

        } catch (err) {
            console.error(err)
        }
    },

}
</script>