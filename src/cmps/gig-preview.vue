<template>
    <section class="gig-preview flex">
        <li>
            <img :src="gig.imgUrl" alt="" class="full" />
            <article class="preview-card">
                <div class="flex mini-user">
                    <img :src="gig.owner.imgUrl" alt="">
                    <div>
                        <p class="fs14">{{ gig.owner.fullname }}</p>
                        <p :class='(gig.owner.level  === "Top Rated Seller" ? "orange" : "" , "fs14")'>{{ gig.owner.level }} seller</p>
                    </div>
                </div>
                <router-link :to="'/gig/' + gig._id">{{ gig.title }}</router-link>
                <p class="orange fs14">&#9733{{ gig.owner.rate }}</p>
            </article>
            <div class="flex space align-center li-bottom">
                <p >🤍</p>
                <div class="flex column align-end">
                    <p class="fs10">STARTING AT</p>
                    <p class="fs18">${{ gig.price.basic?.toLocaleString() }}</p>
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

export default {
    name: 'gig-preview',
    props: {
        gig: Object,
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    }
}
</script>