<template>
  <div>
    <section class="home ">
      <div class="hero-title  " style="height:680px ; position: relative;">
        <app-hero @modelName="modelNameChange" @modelJob="modelJobChange" />
        <div class="main-layout">
          <div class="hero-grid ">
            <div class="mb-10 bold-font">
              <h2 class="header-title ">Find the perfect <span class="courgette"> freelance</span></h2>
              <h2 class="header-title">services for your business</h2>
            </div>
            <gig-filter @setFilter="setFilter" />
            <p class="img-names">{{ modelName }}<span class="mac-bold ">{{ modelJob }}</span></p>
          </div>
        </div>
      </div>

      <div class="main-layout ">
        <div class="Trusted-by mb-24 flex full">
          <p>Trusted By:</p>
          <img v-for="img in trustedByImg" :src="img" alt="">
        </div>
        <h2 class="mb-24 popular-header mac-bold">Popular professional services</h2>
        <div class=" slider-container app-container">
          <div class="slider-btn left-slider-btn fs20">
            <button class="left-svg" @click="scrollImg(-1)"></button>
          </div>
          <div class="slider-btn right-slider-btn fs20">
            <button class="right-svg" @click="scrollImg(1)"></button>
          </div>
          <!-- <button class="slider-btn right-slider-btn fs20" @click="scrollImg(1)">></button> -->
          <div ref="slider" class="flex slider-imgs-container">
            <imgHero :imgs="gigsUrl" />
          </div>
        </div>
        <div class="main-layout full home-freelance-container">
          <div class="home-freelance flex mb-24">
            <div class="flex column ">
              <h2 class="fs32 mb-24 mac-bold">A whole world of freelance talent at your fingertips</h2>
              <h4><span></span> The best for every budget</h4>
              <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
              <h4><span></span> Quality work done quickly</h4>
              <p>Find the right freelancer to begin working on your project within minutes.</p>
              <h4><span></span> Protected payments, every time</h4>
              <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
              <h4><span></span> 24/7 support</h4>
              <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
            </div>
            <img alt="Video teaser image"
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
              loading="auto">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import appHero from '../cmps/app-hero.vue'
import gigFilter from '../cmps/gig-filter.vue'
import imgHero from '../cmps/img-hero.vue'
import imgSlider1 from '@/imgs/home-img/slider1.jpg'
import imgSlider2 from '@/imgs/home-img/slider2.jpg'
import imgSlider3 from '@/imgs/home-img/slider3.jpg'
import imgSlider4 from '@/imgs/home-img/slider4.jpg'
import imgSlider5 from '@/imgs/home-img/slider5.jpg'
import imgSlider6 from '@/imgs/home-img/slider6.jpg'
import imgSlider7 from '@/imgs/home-img/slider7.jpg'
import imgSlider8 from '@/imgs/home-img/slider8.jpg'

export default {

  name: 'home',
  data() {
    return {
      modelName: 'Andrea, ',
      modelJob: 'Fashion Designer',
      show:false
    }
  },
  created() {
    this.$store.dispatch({ type: 'getGigsUrl', })
  },
  methods: {
    setFilter(filterBy) {
      this.$router.push({ name: 'gig-app', query: { ...filterBy } })
      this.$store.commit({ type: 'setFilter', filterBy: { ...filterBy } })
    },
    scrollImg(dir) {
      this.$refs.slider.scrollBy({ right: dir * 2000, left: dir * 2000, behavior: "smooth" })
    },
    modelNameChange(name) {
      this.modelName = name
    },
    modelJobChange(job) {
      this.modelJob = job
    },
  },
  computed: {
    gigsUrl() {
      return [
        {
          src: imgSlider1,
          p: 'Build your brand',
          title: 'Logo Design'
        },
        {
          src: imgSlider2,
          p: 'Custiomize your site',
          title: 'WordPress'
        },
        {
          src: imgSlider3,
          p: 'Share your message',
          title: 'Voice Over'
        },
        {
          src: imgSlider4,
          p: 'Engage your audience',
          title: 'Video Explainer'
        },
        {
          src: imgSlider5,
          p: 'Unlock growth online',
          title: 'SEO'
        },
        {
          src: imgSlider6,
          p: 'Color your dreams',
          title: 'Illustration'
        },
        {
          src: imgSlider7,
          p: 'Go global',
          title: 'Translation'
        },
        {
          src: imgSlider8,
          p: 'Learn your business',
          title: 'Data entry'
        },
      ]
    },
    trustedByImg() {
      return [
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png",
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png",
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png",
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png",
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png",
      ]
    }
  },
  components: {
    gigFilter,
    appHero,
    imgHero
  }
}
</script>
