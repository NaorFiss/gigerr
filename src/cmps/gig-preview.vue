<template >
    <section v-if="gig" class="gig-preview">
        <li>
            <imgCard @click="gigDetails" :imgs="gig.imgUrl" />
            <article class="preview-card flex column">
                <div class="flex space">
                    <div class="flex mini-user" v-if="gig.owner">
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
                    <el-dropdown class="edit-dropdown-container" v-if="isYourProfile" trigger="click" size="large">
                        <img class="three-dots" src="@/assets/svg/three-dots.svg" alt="">
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item><button class="edit-dropdown" @click="removeGig(gig._id)">Remove gig</button></el-dropdown-item>
                                <el-dropdown-item><router-link class="edit-dropdown" :to="'/gig/edit/' + gig._id">Update</router-link></el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <router-link class="title" :to="'/gig/' + gig._id">{{ gig.title }}</router-link>
                <p v-if="gig.owner" class="clr-6 fs14"><span class="orange ">★{{ gig.owner.rate }}</span> (24)</p>
            </article>
            <div class="flex space align-center li-bottom">
                <p>❤</p>
                <div class="flex align-end sapce">
                    <p class="fs10 weight-7">STARTING AT</p>
                    <p class="fs18 black">US${{ gig.price.basic?.toLocaleString() }}</p>
                </div>
            </div>
        </li>
    </section>
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
                showSuccessMsg(`Gig removed`)
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot remove gig')
            }
        },
    },
    components: {
        imgCard
    }
}
</script>