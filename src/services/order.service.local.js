
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    addOrderMsg,
    queryUrl,
    getBuyerOrders,
    getSellerOrders,
}
window.cs = orderService

async function query(filterBy) {
    var orders = await storageService.query(STORAGE_KEY)

    return orders
}

async function queryUrl() {
    var orders = await storageService.query(STORAGE_KEY)
    var urlList = []
    orders.map(order => {
        urlList = urlList.concat(order.imgUrl)
    })
    return urlList
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function getBuyerOrders(userId) {
    var orders = await storageService.query(STORAGE_KEY)
    return orders.filter(order => order.buyer._id === userId)
}

async function getSellerOrders(userId) {
    var orders = await storageService.query(STORAGE_KEY)
    return orders.filter(order => order.seller._id === userId)
}

async function remove(orderId) {
    let user = userService.getLoggedinUser()
    let idx = user.orders.findIndex(order => order._id === orderId)
    user.orders.splice(idx, 1)
    userService.update(user)
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        const user = userService.getLoggedinUser()
        order._id = utilService.makeId()
        order.buyer = { _id: user._id, imgUrl: user.imgUrl, fullname: user.fullname }
        order.createdAt = new Date().toDateString(),
            order.status = 'pending'
        // order.owner.orders.push({ _id: order._id })
        // userService.update(order.owner)
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function getEmptyOrder() {
    return {
        title: 'I will',
        price: { basic: '' },
        description: '',
        owner: { rate: 4 },
        imgUrl: [
            "./src/imgs/order-img/order1/1.jpg",
            "./src/imgs/order-img/order1/2.jpg",
            "./src/imgs/order-img/order1/3.jpg",
        ],

    }
}




// // TEST DATA
// (async () => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g1",
//         "title": "I will design your logo in no time trust me ",
//         "price":
//         {
//             "basic": 12,
//             "standard": 30,
//             "premium": 50
//         },
//         "owner": {
//             "_id": "1",
//             "fullname": "itzik",
//             "imgUrl": "./src/imgs/user-img/itzik.jpg",
//             "level": "Level 1",
//             "rate": 4.2,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 3,
//         "description": "Any logo you can think of I will make it! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order1/1.jpg",
//             "./src/imgs/order-img/order1/2.jpg",
//             "./src/imgs/order-img/order1/3.jpg",
//         ],
//         "tags": [
//             "Logo Design",
//             "artisitic",
//             "proffesional",
//             "accessible",
//             "Video Editing"
//         ],

//         "likedByUsers": [
//             {
//                 "_id": 2,
//                 "username": 'naor'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ]

//         // for user-wishlist : use $in
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
//             "imgUrl": "./src/imgs/user-img/Naor-Fiss.jpeg",
//             "level": "Level 2",
//             "rate": 3.7,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order2/1.jpg",
//             "./src/imgs/order-img/order2/2.jpg",
//             "./src/imgs/order-img/order2/3.jpg",
//         ],
//         "tags": [
//             "app",
//             "Website Design",
//             "computer",
//             "Logo Design"
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 3,
//                 "username": 'shachar'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ]// for user-wishlist : use $in
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
//             "imgUrl": "./src/imgs/user-img/shacar.jpg",
//             "level": "Top Rated",
//             "rate": 5.0,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order3/1.jpg",
//             "./src/imgs/order-img/order3/2.jpg",
//         ],
//         "tags": [
//             "english",
//             "proffesional",
//             "langaugh",
//             "WordPress"

//         ],
//         "likedByUsers": [
//             {
//                 "_id": 1,
//                 "username": 'itzik'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)

//     await storageService.post(STORAGE_KEY, {
//         "_id": "g4",
//         "title": "I will grow instagram marketing instagram promotion to get targeted instagram followers ",
//         "price":
//         {
//             "basic": 177,
//             "standard": 340,
//             "premium": 450
//         },
//         "owner": {
//             "_id": "1",
//             "fullname": "itzik",
//             "imgUrl": "./src/imgs/user-img/itzik.jpg",
//             "level": "Level 1",
//             "rate": 4.2,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 3,
//         "description": "grow-and-manage-your-instagram-marketing ",
//         "imgUrl": [
//             "./src/imgs/order-img/order4/1.jpg",
//             "./src/imgs/order-img/order4/2.jpg",
//             "./src/imgs/order-img/order4/3.jpg",
//         ],
//         "tags": [
//             "marketing",
//             "instagram",
//             "proffesional",
//             "accessible",

//         ],
//         "likedByUsers": [
//             {
//                 "_id": "2",
//                 "username": 'naor'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g5",
//         "title": "I will  UX and marketing content for your website and apps",
//         "price":
//         {
//             "basic": 1300,
//             "standard": 2200,
//             "premium": 3015
//         },
//         "owner": {
//             "_id": "2",
//             "fullname": "naor",
//             "imgUrl": "./src/imgs/user-img/Naor-Fiss.jpeg",
//             "level": "Level 2",
//             "rate": 3.7,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order5/1.jpg",
//             "./src/imgs/order-img/order5/2.jpg",
//             "./src/imgs/order-img/order5/3.jpg",
//         ],
//         "tags": [
//             "app",
//             "UX",
//             "marketing",
//             "writting"
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 3,
//                 "username": 'shachar'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g6",
//         "title": "I will write professional resume cover letter and linkedin",
//         "price":
//         {
//             "basic": 53,
//             "standard": 89,
//             "premium": 127
//         },
//         "owner": {
//             "_id": "3",
//             "fullname": "shachar",
//             "imgUrl": "./src/imgs/user-img/shacar.jpg",
//             "level": "Top Rated",
//             "rate": 5.0,
//             "from": "Israel",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order6/1.jpg",
//             "./src/imgs/order-img/order6/2.jpg",
//             "./src/imgs/order-img/order6/3.jpg"
//         ],
//         "tags": [
//             "english",
//             "proffesional",
//             "langaugh",
//             "resume cover",
//             "linkedin"

//         ],
//         "likedByUsers": [
//             {
//                 "_id": 1,
//                 "username": 'itzik'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)

//     await storageService.post(STORAGE_KEY, {
//         "_id": "g7",
//         "title": "I will do wordpress malware removal within 1hour",
//         "price":
//         {
//             "basic": 77,
//             "standard": 100,
//             "premium": 150
//         },
//         "owner": {
//             "_id": "7",
//             "fullname": "malware_hunter5",
//             "imgUrl": "./src/imgs/user-img/malware_hunter5.jpg",
//             "level": "Level 1",
//             "rate": 4.2,
//             "from": "United States",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 3,
//         "description": "wordpress malware removal ",
//         "imgUrl": [
//             "./src/imgs/order-img/order7/1.jpg",
//             "./src/imgs/order-img/order7/2.jpg",
//             "./src/imgs/order-img/order7/3.jpg",
//         ],
//         "tags": [
//             "marketing",
//             "instagram",
//             "proffesional",
//             "wordpress",

//         ],
//         "likedByUsers": [
//             {
//                 "_id": "2",
//                 "username": 'naor'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g8",
//         "title": "I will be your loyal adhd body double",
//         "price":
//         {
//             "basic": 50,
//             "standard": 88,
//             "premium": 162
//         },
//         "owner": {
//             "_id": "8",
//             "fullname": "shanontjopp7",
//             "imgUrl": "./src/imgs/user-img/shanontjopp7.jpg",
//             "level": "Level 2",
//             "rate": 4.7,
//             "from": "Jamaica",
//             "memberSince": 2017,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order8/1.jpg",
//             "./src/imgs/order-img/order8/2.jpg",
//             "./src/imgs/order-img/order8/3.jpg",
//         ],
//         "tags": [
//             "body double",
//             "lifestyle",
//             "marketing",
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 3,
//                 "username": 'shachar'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g9",
//         "title": "I will life coach you to help you unlock your potential",
//         "price":
//         {
//             "basic": 153,
//             "standard": 189,
//             "premium": 227
//         },
//         "owner": {
//             "_id": "9",
//             "fullname": "pete_rox_coach",
//             "imgUrl": "./src/imgs/user-img/pete_rox_coach.jpg",
//             "level": "Top Rated",
//             "rate": 5.0,
//             "from": "Switzerland",
//             "memberSince": 2020,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order9/1.jpg",
//             "./src/imgs/order-img/order9/2.jpg",
//         ],
//         "tags": [
//             "coaching",
//             "proffesional",
//             "langaugh",


//         ],
//         "likedByUsers": [
//             {
//                 "_id": 1,
//                 "username": 'itzik'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g10",
//         "title": "I will plan a researched travel itinerary for your vacation or trip",
//         "price":
//         {
//             "basic": 268,
//             "standard": 421,
//             "premium": 770
//         },
//         "owner": {
//             "_id": "10",
//             "fullname": "haley_spencer",
//             "imgUrl": "./src/imgs/user-img/haley_spencer.jpg",
//             "level": "Level 1",
//             "rate": 4.2,
//             "from": "United States",
//             "memberSince": 2010,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 3,
//         "description": "wordpress malware removal ",
//         "imgUrl": [
//             "./src/imgs/order-img/order10/1.jpg",
//             "./src/imgs/order-img/order10/2.jpg",
//             "./src/imgs/order-img/order10/3.jpg",
//         ],
//         "tags": [
//             "traveling",
//             "vacation",
//             "proffesional",
//             "trip",

//         ],
//         "likedByUsers": [
//             {
//                 "_id": "2",
//                 "username": 'naor'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g11",
//         "title": "I will help you buy and send something from indonesia",
//         "price":
//         {
//             "basic": 17,
//             "standard": 28,
//             "premium": 62
//         },
//         "owner": {
//             "_id": "11",
//             "fullname": "faadila",
//             "imgUrl": "./src/imgs/user-img/faadila.jpg",
//             "level": "Level 2",
//             "rate": 4.7,
//             "from": "Indonesia",
//             "memberSince": 2017,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 4,
//         "description": "I build your app faster than you think! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order11/1.jpg",
//             "./src/imgs/order-img/order11/2.jpg",
//             "./src/imgs/order-img/order11/3.jpg",
//         ],
//         "tags": [
//             "indonesia",
//             "lifestyle",
//             "marketing",
//         ],
//         "likedByUsers": [
//             {
//                 "_id": 3,
//                 "username": 'shachar'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)
//     await storageService.post(STORAGE_KEY, {
//         "_id": "g12",
//         "title": "I will design responsive wordpress website for small businesses",
//         "price":
//         {
//             "basic": 153,
//             "standard": 189,
//             "premium": 227
//         },
//         "owner": {
//             "_id": "12",
//             "fullname": "theophildio",
//             "imgUrl": "./src/imgs/user-img/theophildio.jpg",
//             "level": "Top Rated",
//             "rate": 5.0,
//             "from": "Bangladesh",
//             "memberSince": 2020,
//             "about": "The very BEST!"
//         },
//         "daysToMake": 5,
//         "description": "I can teach you english quick! ",
//         "imgUrl": [
//             "./src/imgs/order-img/order12/1.jpg",
//             "./src/imgs/order-img/order12/2.jpg",
//             "./src/imgs/order-img/order12/3.jpg"
//         ],
//         "tags": [
//             "website design",
//             "proffesional",
//             "langaugh",
//             "wordpress"


//         ],
//         "likedByUsers": [
//             {
//                 "_id": 1,
//                 "username": 'itzik'
//             },
//         ],
//         "reviews": [
//             {
//                 "_id": "r1",
//                 "user_id": 2,
//                 "username": 'naor',
//                 "userImgUrl": "./src/imgs/user-img/jewel.jpg",
//                 "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//                 "countryName": "Argentina",
//                 "rate": 5,
//                 "txt": "I am satisfied with my first experience on fiverr and with mohsinfancy.Communication was good, even though sometimes a bit short and informal.I am happy with the solid design skill, even if nothing extraordinary.You can tell he has his style or template but this is ok, as it fits well with what I was looking for.All in all very good price/ performance ratio"
//             }
//         ] // for user-wishlist : use $in
//     },)

// })()

