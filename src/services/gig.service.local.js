
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
        console.log(gig.owner);
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
        price: { basic: utilService.getRandomIntInclusive(1000, 9000) },
        description: 'I will do a nice job',
        owner: { rate: 4 },
        imgUrl: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/22527722/original/d9de303ea2f07efe1e75e1a67f657e33e6aa9b4f/do-professional-and-unique-logo-design.jpg'

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
//           "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//           "level": "Level 1",
//           "rate": 4,
//           "from": "Israel",
//           "memberSince": 2010,
//           "about": "The very BEST!"
//         },
//         "daysToMake": 3,
//         "description": "Any logo you can think of I will make it! ",
//         "imgUrl": [
//             "./src/imgs/gig-img/gig1/1.jpg",
//             "./src/imgs/gig-img/gig1/2.jpg",
//             "./src/imgs/gig-img/gig1/3.jpg",
//         ],
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
//           "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//           "level": "Level 2",
//           "rate": 4,
//           "from": "Israel",
//           "memberSince": 2010,
//           "about": "The very BEST!"
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": [
//             "./src/imgs/gig-img/gig2/1.jpg",
//             "./src/imgs/gig-img/gig2/2.jpg",
//             "./src/imgs/gig-img/gig2/3.jpg",
//         ],
//             "tags": [
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
//           "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//           "level": "Top Rated",
//           "rate": 5,
//           "from": "Israel",
//           "memberSince": 2010,
//           "about": "The very BEST!"
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": [
//             "./src/imgs/gig-img/gig3/1.jpg",
//             "./src/imgs/gig-img/gig3/2.jpg",
//         ],
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