<template>
    <h1 class="txt-black-tag" v-if="$route.query.title">Results for "{{ $route.query.title }}"</h1>
    <h1 class="txt-black-tag" v-else-if="$route.query.tag">{{ $route.query.tag }}</h1>
    <h1 class="txt-black-tag" v-else>Explore</h1>
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


            <el-select class="m-2 delivery-input" placeholder="Delivery Time" size="large">
                <div class1="content-scroll">
                    <el-option class="delivery-opt sel1" value="" @click="setDelFilter(1)">Express 24H</el-option>
                    <el-option class="delivery-opt sel3" value="" @click="setDelFilter(3)">Up to 3 days</el-option>
                    <el-option class="delivery-opt sel7" value="" @click="setDelFilter(7)">Up to 7 days</el-option>
                    <el-option class="delivery-opt sel0" value="" @click="setDelFilter(0)">Anytime</el-option>
                </div>
            </el-select>
        </div>

    </div>
    <div class="sorting-click">
        <div class="flex mb-24">
            <h4 class="available-services" v-if="gigs">{{ gigs.length }} Services available</h4>
        </div>
    </div>

</template>
<script>


export default {
    data() {
        return {
            filterBy: {
                min: '',
                max: '',
                delivery: '',
                tag: '',
                title: ''
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
        setDelFilter(delivery) {
            document.querySelector(`.sel1`).classList.remove('gr')
            document.querySelector(`.sel3`).classList.remove('gr')
            document.querySelector(`.sel7`).classList.remove('gr')
            document.querySelector(`.sel0`).classList.remove('gr')
            document.querySelector(`.sel${delivery}`).classList.add('gr')
            if (!delivery) delivery = ''
            this.filterBy.delivery = delivery
            this.filterBy.min = this.$route.query.min
            this.filterBy.max = this.$route.query.max
            this.filter()

        },
        clearBudget() {
            this.filterBy.min = ''
            this.filterBy.max = ''
            this.filter()
        },
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