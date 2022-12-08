<template>
    <div class="order-details flex column" v-if=gig>
        <div class="order-card">
            <div class="flex gap-16 space">
                <p class="black mac-bold">Basic</p>
                <p class="fs20 black mb-24">US${{ gig.price.basic }}</p>
            </div>
            <h4 class="mac-light mb-24">{{ gig.description }}</h4>
            <p class="fs14 mac-bold delivery-days"><span></span>{{gig.daysToMake }} Days delivery</p>
            <div class="v-list flex column mb-24">
                <p><span></span>3 concepts included</p>
                <p><span></span>Vector file</p>
                <p><span></span>Printable file</p>
                <p><span></span>Include source file</p>
            </div>
            <router-link :to="'/checkout/' + gig._id"  class="green-btn btn continue-btn">Continue</router-link>
        </div>
        <button class="white-btn btn">Contact seller</button>
    </div>
</template>
  
<script>
export default {
    props: {
        gig: Object,
    },
}
</script>