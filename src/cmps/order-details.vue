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
            <button @click="makeOrder" class="green-btn btn continue-btn">Continue</button>
        </div>
        <button class="white-btn btn">Contact seller</button>
    </div>
</template>
  
<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export default {
    props: {
        gig: Object,
    },
    methods: {
        async makeOrder() {
            var order = {
                seller: { _id: this.gig.owner._id },
                gig: {
                    _id: this.gig._id,
                    price: this.gig.price.basic,
                    title: this.gig.title,
                    img: this.gig.imgUrl[0]
                }
            }
            try {
            await this.$store.dispatch({ type: 'addOrder', order })
                showSuccessMsg('You got the gig!')
                console.log('hee');
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add gig msg')
            }
            console.log('buying succseed');
        }
    },
}
</script>