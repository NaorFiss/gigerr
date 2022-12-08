<template>
    <section class="gig-edit log-sign flex column ">
        <h2>Add gig</h2>
        <p>{{ msg }}</p>
        <p v-if="!loggedInUser">Log-in before adding a gig</p>
        <form class="add-gig-container flex column gap-16" v-if="loggedInUser" @submit.prevent="addGig()">
            <input type="text" placeholder="Gigs name" v-model="gigToAdd.title" />
            <input type="text" placeholder="Gigs Description" v-model="gigToAdd.description" />
            <input type="text" placeholder="Gigs price" v-model="gigToAdd.price.basic" />
            <input type="text" placeholder="Days to deliver" v-model="gigToAdd.daysToMake" />
            <input type="text" placeholder="Add tags" v-model="gigToAdd.tags" />
            <button class="btn green-btn">Save</button>
        </form>
        <router-link class="btn gray-btn" to="/explore">Back</router-link>
    </section>
</template>

<script>
import { gigService } from '../services/gig.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionAddGigMsg } from '../store/gig.store'


export default {
    data() {
        return {
            msg: '',
            gigToAdd: gigService.getEmptyGig()
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
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
    },
}
</script>