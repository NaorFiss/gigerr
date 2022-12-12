<template>
    <p v-if="!orders.length">There are no gigs yet</p>
    <el-table v-else class="order-table" :data="orders" stripe style="width: 100%">
        <el-table-column class="order-img" v-if="buyerProfile" prop="buyer.imgUrl" label="" width="80">
            <template #default="scope"><img class="order-img" :src="scope.row.gig.img" /></template>
        </el-table-column>
        <el-table-column v-else prop="buyer.imgUrl" width="80">
            <template #default="scope"><img :src="scope.row.buyer.imgUrl" /></template>
        </el-table-column>
        <el-table-column v-if="!buyerProfile" prop="buyer.fullname" label="Buyer" width="100" />
        <el-table-column v-if="buyerProfile" prop="seller.fullname" label="Seller" width="100" />
        <el-table-column prop="gig.title" label="Gig" width="300" />
        <el-table-column prop="createdAt" label="Date" width="180" />
        <el-table-column prop="gig.price" label="Total" width="100">
            <template #default="scope">${{ scope.row.gig.price }}</template>
        </el-table-column>
        <el-table-column v-if="!buyerProfile" prop="status" label="Status" width="105" class="last-col">
            <template #default="scope">
                <el-dropdown trigger="click" >
                <button :class="orderStatus(scope.row.status)">
                    {{scope.row.status }}
                </button>
                <template #dropdown>
                    <el-dropdown-menu class="order-dropdown">
                        <el-dropdown-item @click="approveOrder('Rejected' ,scope.row)" class="table-btn rejected-btn">Rejected</el-dropdown-item>
                        <el-dropdown-item @click="approveOrder('In progress' ,scope.row)" class="table-btn progress-btn">In progress</el-dropdown-item>
                        <el-dropdown-item @click="approveOrder('Completed' ,scope.row)" class="table-btn green-btn">Completed</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            </template>
        </el-table-column>
        <el-table-column v-else prop="status" label="Status" width="105" class="last-col">
            <template #default="scope">
                <button :class="orderStatus(scope.row.status)" class="cursor-default">{{ scope.row.status }}</button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script >
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
export default {
    props: {
        orders: Array
    },
    data() {
        return {
        }
    },
    computed: {
        buyerProfile() {
            return this.$store.getters.loggedinUser?._id === this.orders[0].buyer?._id
        }
    },
    methods: {
        async approveOrder(status , order) {
            if (this.$store.getters.loggedinUser._id !== order.seller._id) return console.log('Not YOUR gig!')
            order.status = status 
            try {
                await this.$store.dispatch({ type: 'updateOrder', order })
                showSuccessMsg('Thanks!  We will update the buyer')
            } catch (err) {
                console.log(err)
                showErrorMsg('Cannot update')
            }
        },
        orderStatus(status) {
            if (status === 'Pending') return 'table-btn'
            else if (status === 'In progress') return 'table-btn progress-btn'
            else if(status === 'Rejected') return 'rejected-btn table-btn'
            else return 'green-btn table-btn'
        },
    },
}
</script>