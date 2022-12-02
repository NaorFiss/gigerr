<template>
    <section class="b-pad-25" v-if=gig>
        <h3 class="black b-pad-25">About the gig</h3>
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