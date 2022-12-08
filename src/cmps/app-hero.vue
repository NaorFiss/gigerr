<template>
    <section class="hero-container full main-layout">
        <div class="img-container">
            <Transition>
                <img class="full hero-img" v-if1="show" :src="getImgUrl" />
            </Transition>
        </div>
    </section>
</template>

<script>
export default {
    name: 'hero',
    mounted() {
        setInterval(this.changeCurrImage, 3000)
    },
    data() {
        return {
            show: false,
            idx: 1,
        }
    },
    methods: {
        changeCurrImage() {
            this.show = !this.show
            if (!this.show) {
                this.idx = this.idx < 5 ? this.idx + 1 : 1
            }
        }
    },
    computed: {
        getImgUrl() {
            return `src/imgs/hero-img/hero${this.idx}.jpg`
        },
    }
}
</script>
 