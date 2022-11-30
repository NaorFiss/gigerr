
import { storageService } from './async-storage.service.js'
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
    var gigs = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.vendor) || regex.test(gig.description))
    }
    if (filterBy.price) {
        gigs = gigs.filter(gig => gig.price <= filterBy.price)
    }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)
    if (!gig.msgs) gig.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
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


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g1",
//         "title": "I will design your logo",
//         "price":
//         {
//           "basic": 12,
//           "standard": 30,
//           "premium": 50
//         },
//         "owner": {
//           "_id": "1",
//           "fullname": "itzik",
//           "imgUrl": "/img/img1.jpg",
//           "level": "level 1",
//           "rate": 4
//         },
//         "daysToMake": 3,
//         "description": "Any logo you can think of I will make it! ",
//         "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/286507591/original/ca5801a43ad812945a018f799dace04f7e52f679/design-outstanding-logo-for-your-brand.jpg",
//         "tags": [
//           "logo-design",
//           "artisitic",
//           "proffesional",
//           "accessible"
//         ],
//         "likedByUsers": [
//           {
//             "_id": 2,
//             "username": 'naor'
//           },
//         ] // for user-wishlist : use $in
//       },)
//     await storageService.post(STORAGE_KEY,  {
//         "_id": "g2",
//         "title": "I will build an app",
//         "price":
//         {
//           "basic": 40,
//           "standard": 50,
//           "premium": 60
//         },
//         "owner": {
//           "_id": "2",
//           "fullname": "naor",
//           "imgUrl": "/img/img2.jpg",
//           "level": "level 2",
//           "rate": 4
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/185781763/original/375357920dd1ff15663a044cc2333691bd07c371/be-mobile-app-developer-for-android-and-ios-app-development.jpg",
//         "tags": [
//           "app",
//           "proffesional",
//           "computer"
//         ],
//         "likedByUsers": [
//           {
//             "_id": 3,
//             "username": 'shachar'
//           },
//         ] // for user-wishlist : use $in
//       },)
//       await storageService.post(STORAGE_KEY,{
//         "_id": "g3",
//         "title": "I will teach you english",
//         "price":
//         {
//           "basic": 20,
//           "standard": 30,
//           "premium": 40
//         },
//         "owner": {
//           "_id": "3",
//           "fullname": "shachar",
//           "imgUrl": "/img/img3.jpg",
//           "level": "Top Rated Seller",
//           "rate": 5
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165085366/original/514f6bf75dc78f0e0950e2e1a74ea6f863dd3e64/translate-500-words-from-english-to-korean-in-24h.png",
//         "tags": [
//           "english",
//           "proffesional",
//           "langaugh"
//         ],
//         "likedByUsers": [
//           {
//             "_id": 1,
//             "username": 'itzik'
//           },
//         ] // for user-wishlist : use $in
//       },)
// })()