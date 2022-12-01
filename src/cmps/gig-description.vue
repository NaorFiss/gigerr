<template>
    <section v-if=gig>
        <h1>About the gig</h1>
        <p>{{ gig.description }}</p>
    </section>
</template>
  
<script>
export default {
    props: {
        gig: Object
    }
}
</script>