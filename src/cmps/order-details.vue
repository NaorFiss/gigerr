<template>
    <div class="order-details flex column" v-if=gig>
        <div class="order-card">
            <h1>Your order</h1>
            <div class="flex gap-16">
                <p>BASIC (No Custom Work)</p>
                <h2>{{ gig.price.basic }}$</h2>
            </div>
            <h4>{{ gig.description }}</h4>
            <h3>{{ gig.daysToMake }} Days delivery</h3>
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