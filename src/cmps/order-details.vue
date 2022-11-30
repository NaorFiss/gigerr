<template>
    <div class="order-details">
        <div class="order-card">
            <h1>Your order</h1>
            <div class="flex space-between">
                <h2>Basic</h2>
                <h2>{{ gig.price.basic }}$</h2>
            </div>
            <h4>{{ gig.description }}</h4>
            <h3>{{ gig.daysToMake }} Days delivery</h3>
            <button class="btn">Purchase ({{ gig.price.basic }}$)</button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        gig: Object,

    },
}
</script>