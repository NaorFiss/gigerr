<template>
    <div class="order-details flex column" v-if=gig>
        <div class="order-card">
            <div class="flex gap-16 space">
                <p class="black mac-bold">Basic</p>
                <p class="fs20 black">{{ gig.price.basic }}$</p>
            </div>
            <h4 class="mac-light">{{ gig.description }}</h4>
            <p class="fs14">{{ gig.daysToMake }} Days delivery</p>
            <button @click="makeOrder" class="green-btn btn">Continue</button>
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