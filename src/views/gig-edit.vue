<template>
    <section class="gig-edit">
        <form v-if="loggedInUser" @submit.prevent="addGig()">
            <h2>Add gig</h2>
            <input type="text" v-model="gigToAdd.name" />
            <button>Save</button>
        </form>
        <button @click="goBack" class="btn" type="button">go back</button>
    </section>
</template>

<script>
import { gigService } from '../services/gig.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getActionAddGigMsg } from '../store/gig.store'


export default {
    data() {
        return {
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
            try {
                await this.$store.dispatch({ type: 'addGig', gig: this.gigToAdd })
                showSuccessMsg('Gig added')
                this.$router.push('/gig')
                this.gigToAdd = gigService.getEmptyGig()
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot add gig')
            }
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
        goBack() {
            this.$router.push('/gig')
        },
        //     async removeGig(gigId) {
        //         try {
        //             await this.$store.dispatch(getActionRemoveGig(gigId))
        //             showSuccessMsg('Gig removed')

        //         } catch (err) {
        //             console.log(err)
        //             showErrorMsg('Cannot remove gig')
        //         }
        //     },
        //     async updateGig(gig) {
        //         try {
        //             gig = { ...gig }
        //             gig.price = +prompt('New price?', gig.price)
        //             await this.$store.dispatch(getActionUpdateGig(gig))
        //             showSuccessMsg('Gig updated')

        //         } catch (err) {
        //             console.log(err)
        //             showErrorMsg('Cannot update gig')
        //         }
        //     },
        // printGigToConsole(gig) {
        //     console.log('Gig msgs:', gig.msgs)
        // }
    },
}
</script>