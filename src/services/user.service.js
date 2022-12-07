import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { store } from '../store/store'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'setWatchedUser', user })
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, gigs: user.gigs  ,rate: user.rate }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ; (async () => {
//     await userService.signup({
//         "_id": "1",
//         "fullname": "itzik",
//         "imgUrl": "./src/imgs/user-img/itzik.jpg",
//         "username": "itzik",
//         "password": "123",
//         "level": "level 1",
//         "isAdmin": true,
//         "rate": 4.2,
//         "gigs": [{
//             "_id": "g1",
//             "title": "I will design your logo",
//         },
//         {
//             "_id": "g4",
//             "title": "I will grow instagram marketing instagram promotion to get targeted instagram followers ",
//         }],
//         "reviews": [
//             {
//                 "id": "r1",
//                 "gig": {
//                     "_id": "g1",
//                     "title": "I will design your logo",
//                 },
//                 "txt": "Very kind and works fast",
//                 "rate": 4,
//                 "by": {
//                     "_id": "2",
//                     "fullname": "naor",
//                     "imgUrl": "./src/imgs/user-img/Naor-Fiss.jpeg"
//                 },
//             },
//         ],
//     },)
//     await userService.signup({
//         "_id": "2",
//         "fullname": "naor",
//         "imgUrl": "./src/imgs/user-img/Naor-Fiss.jpeg",
//         "username": "naor",
//         "password": "123",
//         "level": "level 2",
//         "isAdmin": true,
//         "rate": 4.8,
//         "gigs": [{
//             "_id": "g2",
//             "title": "I will build an app",
//         },{
//             "_id": "g5",
//             "title": "I will  UX and marketing content for your website and apps",
//         }],
//         "reviews": [
//             {
//                 "id": "r2",
//                 "gig": {
//                     "_id": "g2",
//                     "title": "I will build an app",
//                 },
//                 "txt": "Very kind",
//                 "rate": 5,
//                 "by": {
//                     "_id": "3",
//                     "fullname": "shachar",
//                     "imgUrl": "./src/imgs/user-img/shacar.jpg"
//                 },
//             },
//         ],
//     },)
//     await userService.signup({
//         "_id": "3",
//         "fullname": "shachar",
//         "imgUrl": "./src/imgs/user-img/shacar.jpg",
//         "username": "shachar",
//         "password": "123",
//         "level": "Top Rated",
//         "isAdmin": true,
//         "rate": 4.8,
//         "gigs": [{
//             "_id": "g3",
//             "title": "I will teach you english",
//         },
//         {
//             "_id": "g6",
//             "title": "I will write professional resume cover letter and linkedin",
//         }],
//         "reviews": [
//             {
//                 "id": "r3",
//                 "gig": {
//                     "_id": "g3",
//                     "title": "I will teach you english",
//                 },
//                 "txt": "kind and works ",
//                 "rate": 5,
//                 "by": {
//                     "_id": "1",
//                     "fullname": "itzik",
//                     "imgUrl": "./src/imgs/user-img/itzik.jpg"
//                 },
//             },
//         ],
//     },)
// })()

// ; (async () => {
//     await userService.signup({ fullname: 'Puki Norma', username: 'puki', password: '123', score: 10000, isAdmin: false, rate: 4.5 })

//     await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123', score: 10000, isAdmin: true, rate: 4.5 })

//     await userService.signup({ fullname: 'Muki G', username: 'muki', password: '123', score: 10000, rate: 4.5 })

//     await userService.signup({
//         _id: "1", fullname: 'itzik', username: 'itzik', password: '123', score: 10000, isAdmin: true, rate: 4.2, imgUrl: './src/imgs/user-img/itzik.jpg', "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//         "countryName": "Argentina"
//     })

//     await userService.signup({
//         _id: "2", fullname: 'naor', username: 'naor', password: '123', score: 10000, isAdmin: true, rate: 4.8, imgUrl: './src/imgs/user-img/Naor-Fiss.jpeg', "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//         "countryName": "Argentina"
//     })

//     await userService.signup({
//         _id: "3", fullname: 'shacar', username: 'shacar', password: '123', score: 10000, isAdmin: true, rate: 5.0, imgUrl: './src/imgs/user-img/shacar.jpg', "countryFlag": "./src/imgs/flags-img/argentina.jpg",
//         "countryName": "Argentina"
//     })
// })()

