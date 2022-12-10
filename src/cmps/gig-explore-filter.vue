<template>
    <h1 v-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
    <h1 v-else-if="$route.query.tag">{{ $route.query.tag }}</h1>
    <h1 v-else>Explore</h1>
    <div class="advanced-filter">
        <div class="advanced-input">

            <el-select value="1" class="m-2 budget-input" placeholder="Budget" size="large">
                <div class="content-scroll">
                    <div class="price-range-filter">
                        <div class="input-div">
                            <label class="budget-l">MIN.</label>
                            <el-option value="1"><el-input class="max" type="number" v-model.number="filterBy.min"
                                    @click.stop placeholder="Any" />
                                <i class="dollar-sign">$</i>
                            </el-option>
                        </div>
                        <div class="input-div">
                            <label class="budget-l">MAX.</label>
                            <el-option value="1"><el-input class="max" type="number" v-model.number="filterBy.max"
                                    @click.stop placeholder="Any" /><i class="dollar-sign">$</i></el-option>
                        </div>
                    </div>
                </div>
                <div class="btn-row"><el-button class="clear" @click="clearBudget()">Clear
                    </el-button><el-option class="apply" @click="filter()">Apply</el-option>
                </div>
            </el-select>


            <el-select @visible-change="filter()" class="m-2 delivery-input" v-model="filterBy.delivery"
                placeholder="Delivery Time" size="large">
                <div class1="content-scroll">
                    <el-option class="delivery-opt" value="1" v-model="filterBy.delivery">Express 24H</el-option>
                    <el-option class="delivery-opt" value="3" v-model="filterBy.delivery">Up to 3 days</el-option>
                    <el-option class="delivery-opt" value="7" v-model="filterBy.delivery">Up to 7 days</el-option>
                    <el-option class="delivery-opt" value="" v-model="filterBy.delivery">Anytime</el-option>
                    <!-- <div class="btn-row"><el-button class="clear" @click="clearDeliverby()">Clear
                            All</el-button>
                    </div> -->
                </div>
            </el-select>
        </div>

    </div>
    <div class="sorting-click">
        <div class="flex ">
            <h4 class="available-services" v-if="gigs">{{ gigs.length }} Services available</h4>
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
        clearDeliverby() {
            this.filterBy.delivery = null
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