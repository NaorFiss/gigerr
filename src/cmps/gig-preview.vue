<template>
    <section class="gig-preview flex">
        <li>
            <imgCard :imgs="gig.imgUrl" />
            <article class="preview-card">
                <div class="flex mini-user">
                    <img :src="gig.owner.imgUrl" alt="">
                    <div>
                        <p class="fs14 mac-bold black">{{ gig.owner.fullname }}</p>
                        <p :class=' gig.owner.level === "Top Rated" ? "orange , fs14" : "mac-light , fs14" '>{{
                                gig.owner.level
                        }} Seller</p>
                    </div>
                </div>
                <router-link :to="'/gig/' + gig._id">{{ gig.title }}</router-link>
                <p class="orange fs14">&#9733{{ gig.owner.rate }}</p>
            </article>
            <div class="flex space align-center li-bottom">
                <p>❤</p>
                <div class="flex column align-end">
                    <p class="fs10 weight-7">STARTING AT</p>
                    <p class="fs18 black">${{ gig.price.basic?.toLocaleString() }}</p>
                </div>
            </div>
        </li>
    </section>
    <!-- <button @click="removeGig(gig._id)">x</button> -->
    <!-- <button @click="updateGig(gig)">Update</button> -->
    <!-- <button @click="addGigMsg(gig._id)">Add gig msg</button>
<button @click="printGigToConsole(gig)">Print msgs to console</button> -->
</template>

<script>
import imgCard from './img-card.vue'

export default {
    name: 'gig-preview',
    props: {
        gig: Object,
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    },
    components: {
        imgCard
    }
}
</script>