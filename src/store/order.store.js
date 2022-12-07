import { orderService } from '../services/order.service.local.js'

export function getActionRemoveOrder(orderId) {
    return {
        type: 'removeOrder',
        orderId
    }
}
export function getActionAddOrder(order) {
    return {
        type: 'addOrder',
        order
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: 'updateOrder',
        order
    }
}

export function getActionAddOrderMsg(orderId) {
    return {
        type: 'addOrderMsg',
        orderId,
        txt: 'Stam txt'
    }
}

export const orderStore = {
    state: {
        orders: [],
        ordersUrl: [],
        filterBy: {
            txt: '',
            price: 0,
            tag: '',
        },
        // userOrders:[],
    },
    getters: {
        orders({ orders }) { return orders },
        ordersUrl({ ordersUrl }) { return ordersUrl },
        // ordersUrl({ userOrders }) { return userOrders },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        setUrlList(state, { urlList }) {
            state.ordersUrl = urlList
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },
        updateOrder(state, { order }) {
            const idx = state.orders.findIndex(c => c.id === order._id)
            state.orders.splice(idx, 1, order)
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter(order => order._id !== orderId)
        },
        addOrderMsg(state, { orderId, msg }) {
            const order = state.orders.find(order => order._id === orderId)
            if (!order.msgs) order.msgs = []
            order.msgs.push(msg)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
    },
    actions: {
        async addOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit(getActionAddOrder(order))
                return order
            } catch (err) {
                console.log('orderStore: Error in addOrder', err)
                throw err
            }
        },
        async updateOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit(getActionUpdateOrder(order))
                return order
            } catch (err) {
                console.log('orderStore: Error in updateOrder', err)
                throw err
            }
        },
        async loadOrders({ commit, state }) {
            try {
                const orders = await orderService.query(state.filterBy)
                commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('orderStore: Error in loadOrders', err)
                throw err
            }
        },
        async removeOrder(context, { orderId }) {
            try {
                await orderService.remove(orderId)
                context.commit(getActionRemoveOrder(orderId))
            } catch (err) {
                console.log('orderStore: Error in removeOrder', err)
                throw err
            }
        },
        async addOrderMsg(context, { orderId, txt }) {
            try {
                const msg = await orderService.addOrderMsg(orderId, txt)
                context.commit({ type: 'addOrderMsg', orderId, msg })
            } catch (err) {
                console.log('orderStore: Error in addOrderMsg', err)
                throw err
            }
        },
        async getOrderById(context, { _id }) {
            try {
                let order = await orderService.getById(_id)
                return order
            } catch (err) {
                console.log('Cannot load order', err);
                throw err;
            }
        },
        async getOrdersUrl({ commit }) {
            try {
                const urlList = await orderService.queryUrl()
                commit({ type: 'setUrlList', urlList })
            } catch (err) {
                console.log('Cannot load urlList', err);
                throw err;
            }
        },
        async setFilter({ commit, dispatch }, { filterBy }) {
            try {
                commit({ type: 'setFilter', filterBy })
                dispatch({ type: 'loadOrders' })
            } catch (err) {
                console.log('Cannot load order', err);
                throw err;
            }
        },
        async getBuyerOrders(context) {
            try {
                const _id = context.getters.loggedinUser._id
                const order = await orderService.getBuyerOrders(_id)
                return order
            } catch (err) {
                console.log('Cannot load order', err);
                throw err;
            }
        },
        async getSellerOrders(context) {
            try {
                const _id = context.getters.loggedinUser._id
                const order = await orderService.getSellerOrders(_id)
                return order
            } catch (err) {
                console.log('Cannot load order', err);
                throw err;
            }
        },
   
    }
}