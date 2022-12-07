<template>
    <div class="advanced-filter">
        <div class="advanced-input">
           
            <el-select value="1" class="m-2 budget-input" placeholder="Budget" size="large">
                <el-option value="1"><el-input type="number" v-model.number="filterBy.min" @click.stop
                        placeholder="Any" /></el-option>
                <el-option value="1"><el-input type="number" v-model.number="filterBy.max" @click.stop
                        placeholder="Any" /></el-option>
                <div><el-button @click="clearBudget()">Clear
                        </el-button><el-button @click="filter()">Apply</el-button>
                </div>
            </el-select>

            
            <el-select @change="filter()" class="m-2 delivery-input" v-model="filterBy.delivery"
                placeholder="Delivery Time" size="large">
                <el-option value="1" v-model="filterBy.delivery">Express 24H</el-option>
                <el-option value="3" v-model="filterBy.delivery">Up to 3 days</el-option>
                <el-option value="7" v-model="filterBy.delivery">Up to 7 days</el-option>
                <el-option value="" v-model="filterBy.delivery">Anytime</el-option>
                <div><el-button @click="clearDeliverby()">Clear
                        All</el-button><el-button @click="filter()">Apply</el-button>
                </div>
                </el-select>
        </div>

    </div>
    <div class="sorting-click">
        <div class="flex ">
            <h4 class="available-services" v-if="gigs">{{ gigs.length }} Services available</h4>
        </div>
        <div class="sort-input">
            <h4> Sort by </h4><el-select id="sortby-select" class="m-2 sortby-select" placeholder="Relevance"
                size="large">
                <el-option value="bestSelling">Best Selling</el-option>
                <el-option value="newestArrivals">Newest Arrivals</el-option>
            </el-select>
        </div>
    </div>

</template>
<script>


export default {
    data() {
        return {
            filterBy: {
                title: '',
                tag: '',
                min: null,
                max: null,
                delivery: null,
            },
            demoInfo: true,
           
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
        gigs() {
            return this.$store.getters.gigs
        },
        titleId() {
            return this.$route.params.title
        }
    },
    created() {
        this.filterBy = { ...this.$route.query }
        this.filter()
    },
    components: {
       
    },
    methods: {
        filter(filterBy = this.filterBy) {
            this.$router.push({ name: 'gig-app', query: { ...filterBy } })
            this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
        },
        clearBudget() {
            this.filterBy.min = ''
            this.filterBy.max = ''
            this.filter()
        },
        clearDeliverby(){
            this.filterBy.delivery=null
            this.filter()
        }
    },
    watch: {
        $route: {
            handler(newValue) {
                if (newValue.path == '/explore') this.filter(newValue.query)
            },
            deep: true
        },
    }
}
</script>