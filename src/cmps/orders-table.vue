<template>
    <el-table class="order-table" :data="orders" stripe style="width: 100%">
        <el-table-column class="order-img" v-if="buyerProfile" prop="buyer.imgUrl" label="" width="165">
            <template  #default="scope"><img class="order-img" :src="scope.row.gig.img" /></template>
        </el-table-column>
        <el-table-column v-else prop="buyer.imgUrl" label="Buyer" width="65">
            <template #default="scope"><img :src="scope.row.buyer.imgUrl" /></template>
        </el-table-column>
        <el-table-column v-if="!buyerProfile" prop="buyer.fullname" width="100" />
        <el-table-column prop="gig.title" label="Gig" width="250" />
        <el-table-column prop="createdAt" label="Date" width="150" />
        <el-table-column prop="gig.price" label="Total" width="70">
            <template #default="scope"> $ {{ scope.row.gig.price }}</template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="130">
            <template #default="scope"><button @click="approveOrder(scope.row)"
                    :class="orderStatus(scope.row.status)">{{ scope.row.status }}
                </button></template>
        </el-table-column>
        <!-- <el-table-column prop="" width="70">
            <template #default="scope">edit</template>
        </el-table-column> -->
    </el-table>
</template>
  
<script >
export default {
    props: {
        orders: Array
    },
    data() {
        return {
        }
    },
    computed:{
        buyerProfile(){
            return this.$store.getters.loggedinUser._id === this.orders[0].buyer._id
        }
    },  
    methods: {
        approveOrder(order) {
            if (this.$store.getters.loggedinUser._id !== order.seller._id) return console.log('Not YOUR gig!');
            order.status = order.status === 'pending' ? 'in progress' : 'complited'
            this.$store.dispatch({ type: 'updateOrder', order })
        },
        orderStatus(status) {
            if (status === 'pending') return 'table-btn'
            else if (status === 'in progress') return 'table-btn progress-btn'
            else return 'green-btn table-btn'

        },
    },
}
</script>