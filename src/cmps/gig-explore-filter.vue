<template>
    <section class="filter flex space-between">
        <div class="filter-btns">

            <button @click="TogglePriceModal" class="price-btn">Budget <span
                    :class="{ open: openPriceModal }">></span></button>
            <price-modal class="price-modal" v-if="openPriceModal" @close="openPriceModal = false" @search="filter" />
            <button class="delivery-btn" @click="ToggleDeliveryModal">Delivery
                Days <span :class="{ open: openDeliveryModal }">></span></button>
            <delivery-modal class="delivery-modal" v-if="openDeliveryModal" @close="openDeliveryModal = false"
                @search="filter" />
        </div>

    </section>
</template>
<script>
import priceModal from './price-modal.vue'
import DeliveryModal from './delivery-modal.vue'

export default {
    data() {
        return {
            filterBy: this.$store.getters.getFilter,
            openTagsModal: false,
            openDeliveryModal: false,
            openPriceModal: false,
            openSortModal: false,
            sortBy: 'all',
            dBtnActive: false,
            bBtnActive: false,


        }
    },
    methods: {
        filter(filterBy) {
            if (filterBy) this.filterBy = filterBy
            this.$store.commit({ type: 'setFilter', filterBy: this.filterBy })
            this.$emit('filter', this.filterBy)
            this.openDeliveryModal = false
            this.openTagsModal = false
            this.openPriceModal = false
            this.openSortModal = false
        },
        ToggleTagsModal() {
            this.openSortModal = false
            this.openPriceModal = false
            this.openDeliveryModal = false,
                this.openTagsModal = !this.openTagsModal
        },
        ToggleDeliveryModal() {
            if(this.bBtnActive){
                document.querySelector(".price-btn").classList.remove("price-btn-active")
                this.bBtnActive=false
            }
            this.openSortModal = false
            this.openPriceModal = false
            this.openTagsModal = false;
            this.openDeliveryModal = !this.openDeliveryModal
            this.dBtnActive=!this.dBtnActive
            if(this.dBtnActive)
            document.querySelector(".delivery-btn").classList.add("delivery-btn-active")
            else 
            document.querySelector(".delivery-btn").classList.remove("delivery-btn-active")
            
        },
        TogglePriceModal() {
            if(this.dBtnActive){
                document.querySelector(".delivery-btn").classList.remove("delivery-btn-active")
                this.dBtnActive=false
            }
            this.openSortModal = false
            this.openTagsModal = false
            this.openDeliveryModal = false;
            this.openPriceModal = !this.openPriceModal
            this.bBtnActive=!this.bBtnActive
            if(this.bBtnActive)
            document.querySelector(".price-btn").classList.add("price-btn-active")
            else 
            document.querySelector(".price-btn").classList.remove("price-btn-active")
        },
        toggleSortModal() {
            this.openTagsModal = false
            this.openDeliveryModal = false;
            this.openPriceModal = false
            this.openSortModal = !this.openSortModal
        },
        sorting(sortBy) {
            if (sortBy) this.sortBy = sortBy
            this.$store.commit({ type: 'setSort', sortBy: this.sortBy })
            this.$store.commit({ type: 'setFilter', filterBy: this.filterBy })
            this.openSortModal = false
        }
    },
    components: {

        DeliveryModal,
        priceModal,

    },
    destroyed() {
        this.filterBy.title = ''
        this.filterBy.tags = 'all'
        this.filterBy.delivery = 'all'
        this.filterBy.min = 0
        this.filterBy.max = Infinity
        this.dBtnActive = false
    }
}
</script>