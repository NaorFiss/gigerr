
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    queryUrl,
    getEmptyOrder,
    addOrderMsg,
    getBuyerOrders,
    getSellerOrders
}
window.cs = orderService


async function query(filterBy = { txt: '', tag: 0 }) {
    console.log(filterBy)
    return httpService.get(STORAGE_KEY, filterBy)
}

async function getBuyerOrders(userId) {
    var orders = await httpService.get(STORAGE_KEY)
    return orders.filter(order => order.buyer._id === userId)
}

async function getSellerOrders(userId) {
    var orders = await httpService.get(STORAGE_KEY)
    return orders.filter(order => order.seller._id === userId)
}

function getById(orderId) {
    // return storageService.get(STORAGE_KEY, orderId)
    console.log('im here', orderId);
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    // await storageService.remove(STORAGE_KEY, orderId)
    console.log(orderId);
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedOrder
    if (order._id) {
        // savedOrder = await storageService.put(STORAGE_KEY, order)
        savedOrder = await httpService.put(`order/${order._id}`, order)
    } else {
        // Later, owner is set by the backend
        // savedOrder = await storageService.post(STORAGE_KEY, order)
        const user = userService.getLoggedinUser()
        order.buyer = { _id: user._id, imgUrl: user.imgUrl, fullname: user.fullname }
        order.createdAt = new Date().toDateString(),
            order.status = 'Pending'
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

async function queryUrl() {
    // console.log("queryUrl-1")
    var orders = await httpService.get(STORAGE_KEY)
    // console.log("queryUrl-2", orders)
    var urlList = []
    orders.map(order => {
        urlList = urlList.concat(order.imgUrl)
    })
    // console.log("urlList", urlList)
    return urlList
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, { txt })
    return savedMsg
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
        level: 'level 1'
    }
}





