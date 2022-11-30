
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var gigs = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     gigs = gigs.filter(gig => regex.test(gig.name) || regex.test(gig.description))
    // }
    // if (filterBy.price) {
    //     gigs = gigs.filter(gig => gig.price <= filterBy.price)
    // }
    // return gigs

}
function getById(gigId) {
    // return storageService.get(STORAGE_KEY, gigId)
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    // await storageService.remove(STORAGE_KEY, gigId)
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        // savedGig = await storageService.put(STORAGE_KEY, gig)
        savedGig = await httpService.put(`gig/${gig._id}`, gig)

    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        // savedGig = await storageService.post(STORAGE_KEY, gig)
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
}


function getEmptyGig() {
    return {
        title: 'gig' + (Date.now() % 1000),
        price: {basic :utilService.getRandomIntInclusive(1000, 9000)},
        description : 'I will do a nice job',
        rate : 4,
        imgUrl : 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/22527722/original/d9de303ea2f07efe1e75e1a67f657e33e6aa9b4f/do-professional-and-unique-logo-design.jpg'
    }
}





