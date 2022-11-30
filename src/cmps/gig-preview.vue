<template>
    <section class="gig-preview flex">
        <li>
            <img :src="gig.imgUrl" alt="" class="full" />
            <article class="preview-card">
                <div class="flex mini-user">
                    <img :src="loggedInUser.imgUrl" alt="">
                    <div>
                        <p>{{ gig.owner.fullname }}</p>
                        <p>{{ gig.owner.level }} seller</p>
                    </div>
                </div>
                <p>{{ gig.title }}</p>
                <p class="orange">⭐ {{ gig.owner.rate }}</p>
            </article>
            <div class="flex space align-center li-bottom">
                <p >🤍</p>
                <div class="flex column align-end">
                    <p>STARTING AT</p>
                    <p>${{ gig.price.basic?.toLocaleString() }}</p>
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