<template>
    <section class="gig-preview ">
        <li>
            <imgCard @click="gigDetails" :imgs="gig.imgUrl" />
            <article class="preview-card flex column">
                <div class="flex mini-user">
                    <img :src="gig.owner.imgUrl" alt="">
                    <div>
                        <router-link class="fs14 mac-bold black mini-username" :to='("/user/" + gig.owner._id)'>{{
                                gig.owner.fullname
                        }}</router-link>
                        <p :class='gig.owner.level === "Top Rated" ? "orange , fs14" : " $clr6, fs14"'>{{
                                gig.owner.level
                        }} Seller</p>
                    </div>
                </div>
                <router-link class="title" :to="'/gig/' + gig._id">{{ gig.title }}</router-link>
                <p class="clr-6"><span class="orange  flex3">★{{ gig.owner.rate }}</span>(24)</p>
            </article>
            <div class="flex space align-center li-bottom">
                <p>❤</p>
                <div class="flex align-end sapce">
                    <p class="fs10 weight-7">STARTING AT</p>
                    <p class="fs18 black">${{ gig.price.basic?.toLocaleString() }}</p>
                </div>
            </div>
        </li>
        <button v-if="isYourProfile" @click="removeGig(gig._id)">x</button>
    </section>
    <!-- <button @click="updateGig(gig)">Update</button> -->
    <!-- <button @click="addGigMsg(gig._id)">Add gig msg</button>
<button @click="printGigToConsole(gig)">Print msgs to console</button> -->
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionRemoveGig, getActionUpdateGig } from '../store/gig.store'

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
        isYourProfile() {
            return this.$store.getters.loggedinUser?._id === this.gig.owner?._id
        }
    },
    methods: {
        gigDetails() {
            this.$router.push('/gig/' + this.gig._id)
        },
        async removeGig(gigId) {
            try {
                await this.$store.dispatch(getActionRemoveGig(gigId))
                showSuccessMsg('Gig removed')
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot remove gig')
            }
        },
        // async updateGig(gig) {
        //     try {
        //       gig = { ...gig }
        //       gig.price = +prompt('New price?', gig.price.basic)
        //       await this.$store.dispatch(getActionUpdateGig(gig))
        //       showSuccessMsg('Gig updated')

        //     } catch (err) {
        //       console.log(err)
        //       showErrorMsg('Cannot update gig')
        //     }
        //   },
    },
    components: {
        imgCard
    }
}
</script>