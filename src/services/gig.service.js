
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
    queryUrl,
    getEmptyGig,
    addGigMsg


}
window.cs = gigService


async function query(filterBy = { txt: '', tag: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)


}
function getById(gigId) {
    // return storageService.get(STORAGE_KEY, gigId)
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    // await storageService.remove(STORAGE_KEY, gigId)
    const user = userService.getLoggedinUser()
    
    // console.log(gigId)
    // console.log(user)
    let idx = user.gigs.findIndex(gig => gig._id === gigId)
    if(idx === -1) return
    user.gigs.splice(1,idx)
    await userService.update(user)
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        // savedGig = await storageService.put(STORAGE_KEY, gig)
        savedGig = await httpService.put(`gig/${gig._id}`, gig)

    } else {
        // Later, owner is set by the backend
        // savedGig = await storageService.post(STORAGE_KEY, gig)
        // gig.owner = userService.getLoggedinUser()
        // console.log(gig.owner);
        savedGig = await httpService.post('gig', gig)
        const user = await userService.getById(gig.owner._id)
        user.gigs.push({ _id: savedGig._id })
        await userService.update(user)
    }
    return savedGig
}

async function queryUrl() {
    // console.log("queryUrl-1")
    var gigs = await httpService.get(STORAGE_KEY)
    // console.log("queryUrl-2", gigs)
    var urlList = []
    gigs.map(gig => {
        urlList = urlList.concat(gig.imgUrl)
    })
    // console.log("urlList", urlList)
    return urlList
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
}



function getEmptyGig() {
    return {
        title: 'I will',
        price: { basic: '' },
        description: '',
        owner: {  },
        imgUrl: [
            "./src/imgs/gig-img/gig1/1.jpg",
            "./src/imgs/gig-img/gig1/2.jpg",
            "./src/imgs/gig-img/gig1/3.jpg",
        ],
        tags: [],
        daysToMake: '',
    }
}





