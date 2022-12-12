<template>
    <section class="gig-edit log-sign flex column ">
        <h2>{{ addOrUpdate ? 'Update gig' : 'Add gig' }}</h2>
        <p>{{ msg }}</p>
        <p v-if="!loggedInUser">Log-in before adding a gig</p>
        <form class="add-gig-container flex column gap-16" v-if="loggedInUser" @submit.prevent="addGig()">
            <div v-if="!secongPage" class="flex column gap-16 add-gig-inside-container">
                <div class="flex align-center gap-16">
                    <h3>Title</h3>
                    <input type="text" placeholder="Gigs name" v-model="gigToAdd.title" />
                </div>
                <div class="flex align-center gap-16">
                    <h3>Description</h3>
                    <input type="text" placeholder="Gigs Description" v-model="gigToAdd.description" />
                </div>
                <div class="flex align-center gap-16">
                    <h3>Price</h3>
                    <input type="text" placeholder="Gigs price" v-model="gigToAdd.price.basic" />
                </div>
                <div class="flex align-center gap-16">
                    <h3>Days To Make</h3>
                    <input type="text" placeholder="Days to deliver" v-model="gigToAdd.daysToMake" />
                </div>
                <div class="flex align-center gap-16">
                    <h3>Tags</h3>
                    <input type="text" placeholder="Add tags" v-model="gigToAdd.tags" />
                </div>
                <button @click="(secongPage = !secongPage)" class="btn green-btn ">Next</button>
            </div>
            <div v-else class="flex column gap-16 add-gig-inside-container">
                <imgUploader @uploaded="addImage" :imgs="gigToAdd.imgUrl"/>
                <button class="btn green-btn">Save</button>
                <button @click="(secongPage = !secongPage)" class="btn green-btn">Back</button>
            </div>
        </form>
        <router-link class="btn gray-btn" to="/explore">Back Home</router-link>
    </section>
</template>

<script>
import { gigService } from '../services/gig.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionAddGigMsg } from '../store/gig.store'
import imgUploader from '../cmps/img-uploader.vue'

export default {
    data() {
        return {
            msg: '',
            gigToAdd: gigService.getEmptyGig(),
            secongPage: false,
        }
    },
    async created() {
        if (this.addOrUpdate) {
            const gig = await this.$store.dispatch({ type: 'getGigById', _id: this.addOrUpdate })
            this.gigToAdd = gig
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        addOrUpdate() {
            return this.$route.params._id
        },
    },
    methods: {
        async addGig() {
            this.gigToAdd.price.basic = +this.gigToAdd.price.basic
            if (this.$route.params._id) this.updateGig()
            if (!this.gigToAdd.title || !this.gigToAdd.price.basic || !this.gigToAdd.description) {
                return this.msg = 'Please fill up the form'
            }
            try {
                await this.$store.dispatch({ type: 'addGig', gig: this.gigToAdd })
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add gig')
            }
            showSuccessMsg('Gig added successfully')
            this.$router.push('/explore')
            this.gigToAdd = gigService.getEmptyGig()
        },
        async addGigMsg(gigId) {
            try {
                await this.$store.dispatch(getActionAddGigMsg(gigId))
                showSuccessMsg('Gig msg added')
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add gig msg')
            }
        },
        async updateGig() {
            try {
                this.gigToAdd._id = this.$route.params._id
                let newgig = await this.$store.dispatch({ type: 'updateGig', gig: this.gigToAdd })
                showSuccessMsg('Gig updated')
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot update gig')
            }
        },
        async addImage(img) {
            if (!img) return
            this.gigToAdd.imgUrl = []
            this.gigToAdd.imgUrl.push(...img)
        }
    },
    components: {
        imgUploader
    }
}
</script>