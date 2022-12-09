<template>
  <section class="main-view flex column ">
    <user-msg/>
    <app-header />
    <router-view />
    <app-footer />
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'


export default {

  created() {
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  components: {
    appHeader,
    userMsg,
    appFooter
  },
}
</script>