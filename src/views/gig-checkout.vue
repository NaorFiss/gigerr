<template>
    <div class="main-layout flex-grow">
        <section class="checkout-container flex column margin-0">
            <h2 class="mb-24">Order details</h2>
            <div v-if="gig" class="flex gap-16">
                <div class="flex column checkout-summary ">
                    <div class="flex space checkout-first-floor">
                        <div class="flex space">
                            <img class="checkout-img" :src="gig.imgUrl[0]" alt="">
                            <div>
                                <p>{{ gig.title }}</p>
                                <p class="clr-6 inline fs14"><span class="orange flex3"><span v-for="n in rate"
                                            class="star-img">
                                            ★</span>{{ gig.owner.rate }}</span>(24)</p>
                            </div>
                        </div>
                        <p>US${{ gig.price.basic }}</p>
                    </div>
                    <div class="flex column checkout-second-floor mb-24">
                        <h3 class="mb-24 fs24 mac-bold">For now you have only one choice</h3>
                        <div class="flex space mb-24">
                            <p class="mac-bold">Gig delivery in {{ gig.daysToMake }} Days</p>
                            <p>US${{ gig.price.basic }}</p>
                        </div>
                    </div>
                </div>
                <div class="checkout-card ">
                    <div class="order-card checkout-card">
                        <h3>Price summary</h3>
                        <div class="flex gap-16 space">
                            <p>Subtotal</p>
                            <p>US${{ gig.price.basic }}</p>
                        </div>
                        <div class="flex gap-16 space">
                            <p>Service fee</p>
                            <p>US$3</p>
                        </div>
                        <div class="flex gap-16 space mac-bold">
                            <p>Total</p>
                            <p>US${{ (gig.price.basic + 3) }}</p>
                        </div>
                        <div class="flex gap-16 space">
                            <p>Delivery time</p>
                            <p>{{ gig.daysToMake }} Days</p>
                        </div>
                        <button @click="makeOrder" class="green-btn btn checkout-btn">Check-out</button>
                    </div>
                    <img class="checkout-img credit-cards"
                        src="https://www.clipartmax.com/png/full/255-2550378_credit-card-logo-credit-card-icons-png.png"
                        alt="">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
export default {

    data() {
        return {
            gig: ''
        }
    },
    async created() {
        this.gig = await this.$store.dispatch({ type: 'getGigById', _id: this.$route.params._id })
    },
    computed: {
        rate() {
            return Math.trunc(+this.gig.owner.rate)
        },
    },
    methods: {
        async makeOrder() {
            var order = {
                seller: { _id: this.gig.owner._id, fullname: this.gig.owner.fullname },
                gig: {
                    _id: this.gig._id,
                    price: this.gig.price.basic,
                    title: this.gig.title,
                    img: this.gig.imgUrl[0]
                }
            }
            try {
                await this.$store.dispatch({ type: 'addOrder', order })
                showSuccessMsg('You got the gig! Please wait for the seller to confirm your order')
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add gig msg')
            }
            let userId = this.$store.getters.loggedinUser._id
            this.$router.push('/user/' + userId)
        }
    },
}
</script>