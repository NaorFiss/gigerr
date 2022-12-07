<template>
    <section class="gig-edit log-sign flex column ">
        <h2>Add gig</h2>
        <form class="add-gig-container flex column gap-16" v-if="loggedInUser" @submit.prevent="addGig()">
            <input type="text" placeholder="Gigs name" v-model="gigToAdd.title" />
            <input type="text" placeholder="Gigs price" v-model="gigToAdd.price.basic" />
            <input type="text" placeholder="Gigs Description" v-model="gigToAdd.description" />
            <button class="btn green-btn">Save</button>
        </form>
        <button @click="goBack" class="btn " type="button">go back</button>
    </section>
</template>

<script>
import { gigService } from '../services/gig.service'
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
                showSuccessMsg('Gig added successfully')
                this.$router.push('/explore')
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
            this.$router.push('/exlpore')
        },
   
            // async updateGig(gig) {
            //     try {
            //         gig = { ...gig }
            //         gig.price = +prompt('New price?', gig.price)
            //         await this.$store.dispatch(getActionUpdateGig(gig))
            //         showSuccessMsg('Gig updated')

            //     } catch (err) {
            //         console.log(err)
            //         showErrorMsg('Cannot update gig')
            //     }
            // },
        // printGigToConsole(gig) {
        //     console.log('Gig msgs:', gig.msgs)
        // }
    },
}
</script>