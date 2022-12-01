<template>
    <section class="gig-details ">
        <div class="gig-overview">
            <div class="gig-info">
                <div class="up-content flex wrap space">
                    <gig-overview id="gig-overview" :gig="gig" />
                    <order-details class="order-details" :gig="gig" />
                </div>
                <gig-description id="gig-description" :gig="gig" />
                <about-seller id="about-seller" :gig="gig" />

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