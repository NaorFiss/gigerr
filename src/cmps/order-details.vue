<template>
    <div class="order-details flex column" v-if=gig>
        <div class="order-card">
            <h1>Your order</h1>
            <div class="flex gap-16 space">
                <p class="black mac-bold">Basic</p>
                <p class="fs20 black">{{ gig.price.basic }}$</p>
            </div>
            <h4 class="mac-light">{{ gig.description }}</h4>
            <p class="fs14">{{ gig.daysToMake }} Days delivery</p>
            <button class="green-btn btn">Continue</button>
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