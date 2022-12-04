<template>
    <div class="details-header flex">
        <!-- <a class="active-link" href="#gigoverview">Overview</a> -->
        <router-link :to="{path: '', hash:'#gig-overview'}">Overview</router-link>
        <router-link :to="{path: '', hash:'#gig-description'}">About the seller</router-link>
        <router-link :to="{path: '', hash:'#about-seller'}">Compare packages</router-link>
        <router-link :to="{path: '', hash:'#gigoverview'}">Reviews</router-link>
        <!-- <a href="#bottom">About the seller</a>
        <a href="">Compare packages</a>
        <a href="">Reviews</a> -->
    </div>
    <section class="gig-details ">
        <div class="gig-overview">
            <div class="gig-info flex">
                <div class="up-content flex column wrap space gap-16 details-left" id="gig-overview">
                    <gig-overview id="gig-overview" :gig="gig" />
                    <gig-description id="gig-description" :gig="gig" />
                    <about-seller id="about-seller" v-if="gig" :owner="gig.owner" />
                    <div style="height:1000px"></div>
                    <a name="gigoverview" id="gigoverview"></a>
                </div>
                <order-details class="order-details" :gig="gig" />
            </div>
        </div>
    </section>

</template>
  
<script>
import gigOverview from "../cmps/gig-overview.vue"
import gigDescription from "../cmps/gig-description.vue"
import aboutSeller from "../cmps/about-seller.vue"
import orderDetails from "../cmps/order-details.vue"
import { gigService } from "../services/gig.service.local.js"
export default {
    data() {
        return {
            gig: null,
        }
    },
    async created() {
        try {
            const id = this.$route.params.id
            const gig = await gigService.getById(id)
            this.gig = gig
        } catch (err) {
            console.error(err)
        }
    },
    components: {
        gigOverview,
        aboutSeller,
        gigDescription,
        orderDetails,
    },
}
</script>