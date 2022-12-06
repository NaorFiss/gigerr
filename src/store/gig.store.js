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
            txt: '',
            price: 0,
            tag: '',
        },

    },
    getters: {
        gigs({ gigs }) { return gigs },
        gigsUrl({ gigsUrl }) { return gigsUrl }
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
            console.log(filterBy);
            state.filterBy = filterBy
            console.log(filterBy);
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
        async getGigById(context, { id }) {
            try {
                let gig = await gigService.getById(id)
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
    }
}