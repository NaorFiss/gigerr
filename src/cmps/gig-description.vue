<template>
    <section class="b-pad-25" v-if=gig>
        <h3 class="black b-pad-25">About the gig</h3>
        <p>{{ gig.description }}</p>
        <p class=" b-pad-25 about-seller">{{ "I'm 23 years old passionate and highly skilled graphic designer working with skillful team of designers and developers. My passion is designing Illustrating new ideas making them come to life. I have been in this industry for more then 4 years. I will design for you a very high-quality, clean, and proffesional logo that stands out from other designs. I'm here to serve all my beautiful upcoming clients." }}</p>
    </section>
</template>
  
<script>
export default {
    props: {
        gig: Object
    }
}
</script>