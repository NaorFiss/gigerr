<template>
    <section ref="header"></section>
    <div class=" details-header-container main-layout" :style="{ position: stickyNav ? 'fixed' : 'static' }">
        <div class="details-header flex">
            <router-link :to="{ path: '', hash: '#gig-overview' }" @click="activeNav = 1"
                :class="activeNav === 1 ? 'active' : ''">Overview</router-link>
            <router-link :to="{ path: '', hash: '#gig-description' }" @click="(activeNav = 2)"
                :class="activeNav === 2 ? 'active' : ''">About the seller</router-link>
            <router-link :to="{ path: '', hash: '#about-seller' }" @click="(activeNav = 3)"
                :class="activeNav === 3 ? 'active' : ''">Compare packages</router-link>
            <router-link :to="{ path: '', hash: '#gig-review' }" @click="(activeNav = 4)"
                :class="activeNav === 4 ? 'active' : ''">Reviews</router-link>
        </div>
    </div>

    <section class="gig-details flex-grow main-layout" :style="{ marginTop: stickyNav ? '51px' : '0' }">
        <div class="gig-info flex">
            <div class="up-content flex column wrap space gap-16 details-left" id="gig-overview">
                <gig-overview id="gig-overview" :gig="gig" />
                <gig-description id="gig-description" :gig="gig" />
                <about-seller id="about-seller" v-if="gig" :owner="gig.owner" />
                <h3 id="gig-review" class="reviews-header">Reviews</h3>
                <!-- <review-app></review-app> -->
                <details-review v-if="gig?.reviews" :gig="gig" />
                <div style="height:100px"></div>
            </div>
            <order-details class="order-details" :gig="gig" :class="stickyNav ? 'order-sticky' : ''" />
        </div>
    </section>

</template>
  
<script>
import gigOverview from "../cmps/gig-overview.vue"
import gigDescription from "../cmps/gig-description.vue"
import aboutSeller from "../cmps/about-seller.vue"
import orderDetails from "../cmps/order-details.vue"
import detailsReview from "../cmps/details-review.vue"
import reviewApp from "./review-app.vue"
import { gigService } from "../services/gig.service.js"
export default {
    data() {
        return {
            gig: null,
            headerObserver: null,
            stickyNav: false,
            activeNav: 1,
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
    methods: {
        onHeaderObserved(entries) {
            entries.forEach((entry) => {
                this.stickyNav = entry.isIntersecting ? false : true;
            })
        },
    },
    mounted() {
        this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
            rootMargin: "-2px 0px 0px",
        });
        this.headerObserver.observe(this.$refs.header);
    },
    components: {
        gigOverview,
        aboutSeller,
        gigDescription,
        orderDetails,
        detailsReview,
        reviewApp
    },
}
</script>