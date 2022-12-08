<template>
  <section class="home main-container max-width-container ">
    <div class="main-layout">
      <div class="hero-title ">
        <app-hero />
        <div class="hero-grid">
          <div class="mb-10 bold-font">
            <h2 class="header-title ">Find the perfect <span class="courgette"> freelance</span></h2>
            <h2 class="header-title">services for your business</h2>
          </div>
          <gig-filter @setFilter="setFilter" />
          <p class="img-names">Zack, Bar Owner</p>
        </div>
      </div>
    </div>
    <div style="height:680px"></div>
    <div class="Trusted-by mb-24 flex">
      <p>Trusted By:</p>
      <img v-for="img in trustedByImg" :src="img" alt="">
    </div>
    <h2 class="mb-24 popular-header mac-bold">Popular professional services</h2>
    <div class=" slider-container">
      <button class="slider-btn left-slider-btn fs20" @click="scrollImg(-1)">&lt</button>
      <button class="slider-btn right-slider-btn fs20" @click="scrollImg(1)">></button>
      <div ref="slider" class="flex slider-imgs-container">
        <imgHero :imgs="gigsUrl" />
      </div>
    </div>
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
  </section>
</template>

<script>
import appHero from '../cmps/app-hero.vue'

import gigFilter from '../cmps/gig-filter.vue'
import imgHero from '../cmps/img-hero.vue'

export default {

  name: 'home',
  created() {
    this.$store.dispatch({ type: 'getGigsUrl', })
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
    },
    scrollImg(dir) {
      this.$refs.slider.scrollBy({ right: dir * 2000, left: dir * 2000, behavior: "smooth" })
    }
  },
  computed: {
    gigsUrl() {
      return [
        {
          src: './src/imgs/home-img/slider1.jpg',
          p: 'Build your brand',
          title: 'Logo Design'
        },
        {
          src: './src/imgs/home-img/slider2.jpg',
          p: 'Custiomize your site',
          title: 'WordPress'
        },
        {
          src: './src/imgs/home-img/slider3.jpg',
          p: 'Share your message',
          title: 'Voice Over'
        },
        {
          src: './src/imgs/home-img/slider4.jpg',
          p: 'Engage your audience',
          title: 'Video Explainer'
        },
        {
          src: './src/imgs/home-img/slider5.jpg',
          p: 'Unlock growth online',
          title: 'SEO'
        },
        {
          src: './src/imgs/home-img/slider6.jpg',
          p: 'Color your dreams',
          title: 'Illustration'
        },
        {
          src: './src/imgs/home-img/slider7.jpg',
          p: 'Go global',
          title: 'Translation'
        },
        {
          src: './src/imgs/home-img/slider8.jpg',
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
    appHeroCopy,
    imgHero
  }
}
</script>
