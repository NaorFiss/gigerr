
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
// const regex = new RegExp(byVendor, 'i')
//   let filteredCars = gCars.filter((car) => regex.test(car.vendor))

async function query(filterBy) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            gigs = gigs.filter(gig => regex.test(gig.title))
            console.log("filterBy.txt :", filterBy.txt)
            console.log("gigs :", gigs)
        }

        if (filterBy.tag) {
            gigs = gigs.filter(gig =>
                gig.tags.includes(filterBy.tag.toLowerCase())

            )
        }
        // if (filterBy) {
        //     gigs = gigs.filter(gig => gig.price.basic <= filterBy.price)
        // }
    }
    console.log(gigs)
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
        imgUrl: [
            "./src/imgs/gig-img/gig1/1.jpg",
            "./src/imgs/gig-img/gig1/2.jpg",
            "./src/imgs/gig-img/gig1/3.jpg",
        ],

    }
}


// TEST DATA
// (async () => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g1",
//         "title": "I will design your logo in no time trust me",
//         "price":
//         {
//             "basic": 12,
//             "standard": 30,
//             "premium": 50
//         },
//         "owner": {
//             "_id": "Gk3Lm",
//             "fullname": "itzik",
//             "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//             "level": "Level 1",
//             "rate": 4.2,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 3,
//         "description": "Any logo you can think of I will make it! ",
//         "imgUrl": [
//             "./src/imgs/gig-img/gig1/1.jpg",
//             "./src/imgs/gig-img/gig1/2.jpg",
//             "./src/imgs/gig-img/gig1/3.jpg",
//         ],
//         "tags": [
//             "logo Design",
//             "artisitic",
//             "proffesional",
//             "accessible"
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 2,
//                 "username": 'naor'
//             },
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g2",
//         "title": "I will build an app, so click here and start apping your special app now! hurry hurry hurry",
//         "price":
//         {
//             "basic": 40,
//             "standard": 50,
//             "premium": 60
//         },
//         "owner": {
//             "_id": "2",
//             "fullname": "naor",
//             "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//             "level": "Level 2",
//             "rate": 3.7,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": [
//             "./src/imgs/gig-img/gig2/1.jpg",
//             "./src/imgs/gig-img/gig2/2.jpg",
//             "./src/imgs/gig-img/gig2/3.jpg",
//         ],
//         "tags": [
//             "app",
//             "Website Design",
//             "computer"
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 3,
//                 "username": 'shachar'
//             },
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g3",
//         "title": "I will teach you english",
//         "price":
//         {
//             "basic": 20,
//             "standard": 30,
//             "premium": 40
//         },
//         "owner": {
//             "_id": "3",
//             "fullname": "shachar",
//             "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
//             "level": "Top Rated",
//             "rate": 5.0,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": [
//             "./src/imgs/gig-img/gig3/1.jpg",
//             "./src/imgs/gig-img/gig3/2.jpg",
//         ],
//         "tags": [
//             "english",
//             "proffesional",
//             "langaugh"
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 1,
//                 "username": 'itzik'
//             },
//         ] // for user-wishlist : use $in
//     },)
// })()