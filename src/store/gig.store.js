import { gigService } from '../services/gig.service.js'

export function getActionRemoveGig(gigId) {
    return {
        type: 'removeGig',
        gigId
    }
}
export function getActionAddGig(gig) {
    return {
        type: 'addGig',
        gig
    }
}
export function getActionUpdateGig(gig) {
    return {
        type: 'updateGig',
        gig
    }
}

export function getActionAddGigMsg(gigId) {
    return {
        type: 'addGigMsg',
        gigId,
        txt: 'Stam txt'
    }
}

export const gigStore = {
    state: {
        gigs: [],
        gigsUrl: [],
        filterBy: {
            title: '',
            category: '',
            subCategory: '',
            min: null,
            max: null,
            delivery: '',
        },
        // userGigs:[],
    },
    getters: {
        gigs({ gigs, filterBy }) {
            var filteredGigs = gigs
            const regex = new RegExp(filterBy.title, 'i')
            filteredGigs = gigs.filter((gig) => regex.test(gig.title))

            if (filterBy.category)
                filteredGigs = filteredGigs.filter(
                    (gig) => gig.category === filterBy.category
                )

            if (filterBy.subCategory)
                filteredGigs = filteredGigs.filter(
                    (gig) => gig.subCategory === filterBy.subCategory
                )

            if (filterBy.min)
                filteredGigs = filteredGigs.filter(
                    (gig) => parseInt(gig.price.basic) >= filterBy.min
                )
            if (filterBy.max)
                filteredGigs = filteredGigs.filter(
                    (gig) => parseInt(gig.price.basic) <= filterBy.max
                )
            if (filterBy.delivery)
                filteredGigs = filteredGigs.filter(
                    (gig) => parseInt(gig.daysToMake) <= filterBy.delivery
                )
            return filteredGigs
        },
        gigsUrl({ gigsUrl }) { return gigsUrl },
        getFilter({filterBy}) { return filterBy }

    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        setUrlList(state, { urlList }) {
            state.gigsUrl = urlList
        },
        addGig(state, { gig }) {
            state.gigs.push(gig)
        },
        updateGig(state, { gig }) {
            const idx = state.gigs.findIndex(c => c.id === gig._id)
            state.gigs.splice(idx, 1, gig)
        },
        removeGig(state, { gigId }) {
            state.gigs = state.gigs.filter(gig => gig._id !== gigId)
        },
        addGigMsg(state, { gigId, msg }) {
            const gig = state.gigs.find(gig => gig._id === gigId)
            if (!gig.msgs) gig.msgs = []
            gig.msgs.push(msg)
        },
        setFilter(state, { filterBy }) {
            // state.filterBy = filterBy

            state.filterBy = filterBy

        },
    },
    actions: {
        async addGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit(getActionAddGig(gig))
                return gig
            } catch (err) {
                console.log('gigStore: Error in addGig', err)
                throw err
            }
        },
        async updateGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit(getActionUpdateGig(gig))
                return gig
            } catch (err) {
                console.log('gigStore: Error in updateGig', err)
                throw err
            }
        },
        async loadGigs({ commit, state }) {
            try {
                const gigs = await gigService.query(state.filterBy)
                commit({ type: 'setGigs', gigs })
            } catch (err) {
                console.log('gigStore: Error in loadGigs', err)
                throw err
            }
        },
        async removeGig(context, { gigId }) {
            try {
                await gigService.remove(gigId)
                context.commit(getActionRemoveGig(gigId))
            } catch (err) {
                console.log('gigStore: Error in removeGig', err)
                throw err
            }
        },
        async addGigMsg(context, { gigId, txt }) {
            try {
                const msg = await gigService.addGigMsg(gigId, txt)
                context.commit({ type: 'addGigMsg', gigId, msg })
            } catch (err) {
                console.log('gigStore: Error in addGigMsg', err)
                throw err
            }
        },
        async getGigById(context, { _id }) {
            try {
                let gig = await gigService.getById(_id)
                return gig
            } catch (err) {
                console.log('Cannot load gig', err);
                throw err;
            }
        },
        async getGigsUrl({ commit }) {
            try {
                const urlList = await gigService.queryUrl()
                commit({ type: 'setUrlList', urlList })
            } catch (err) {
                console.log('Cannot load urlList', err);
                throw err;
            }
        },
        async setFilter({ commit, dispatch }, { filterBy }) {
            try {
                commit({ type: 'setFilter', filterBy })
                dispatch({ type: 'loadGigs' })
            } catch (err) {
                console.log('Cannot load gig', err);
                throw err;
            }
        },
        async AddOrder({ commit, dispatch }, { order }) {
            try {
                // commit({ type: 'setFilter', filterBy })
                // dispatch({ type: 'loadGigs' })
            } catch (err) {
                console.log('Cannot load gig', err);
                throw err;
            }
        },
    }
}