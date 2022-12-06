<template>
    <menu-content-modal @close="close" @search="search">
        <template v-slot:body>
            <form action="">
                <div class="flex delivery-container">
                    <div>
                        <div class="flex delivery-section">
                            <input type="radio" id="one" value="1" v-model="filterBy.delivery">
                            <label :class="isClicked('1')" class="one" for="one"> Express 24H</label>
                        </div>
                        <div class="flex delivery-section">
                            <input type="radio" id="three" value="3" v-model="filterBy.delivery">
                            <label :class="isClicked('3')" class="three" for="three">Up to 3 days</label>
                        </div>
                        <div class="flex delivery-section">
                            <input type="radio" id="seven" value="7" v-model="filterBy.delivery">
                            <label :class="isClicked('7')" class="seven" for="seven">Up to 7 days</label>
                        </div>
                        <div class="flex delivery-section">
                            <input type="radio" id="all" value="1000" v-model="filterBy.delivery">
                            <label :class="isClicked('1000')" class="all" for="all">Anytime</label>
                        </div>
                    </div>
                </div>
            </form>
        </template>
    </menu-content-modal>
</template>

<script>
import menuContentModal from './menu-content-modal.vue'
export default {
    data() {
        return {
            filterBy: {
                title: '',
                tags: 'all',
                delivery: 'all',
                min: 0,
                max: Infinity
            },
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        search() {
            this.$emit('search', this.filterBy)
        }
    },
    computed: {
        isClicked() {
            return ((delivery) => {
                if (delivery === this.filterBy.delivery)
                    return 'clicked'
            })
        }
    },
    components: {
        menuContentModal,
    },
}
</script>