<template>
    <section class="hero-container full">
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
            modelNames: [
                'Andrea, ',
                'Moon, ',
                'Ritika, ',
                'Zac, ',
                'Gabrielle, ',
            ],
            modelJobs: [
                'Fashion Designer',
                'Marketing Expert',
                'Shoemaker and Designer',
                'Bar Owner',
                'Video Editor',
            ]
        }
    },
    methods: {
        changeCurrImage() {
            this.show = !this.show
            if (!this.show) {
                this.idx = this.idx < 5 ? this.idx + 1 : 1
                this.$emit('modelName', this.modelNames[this.idx - 1])
                this.$emit('modelJob', this.modelJobs[this.idx - 1])
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
 