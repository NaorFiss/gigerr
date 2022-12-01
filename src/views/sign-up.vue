<template>
  <div class="container about">
    <p>{{ msg }}</p>
      <form @submit.prevent="doSignup">
        <h2>Join Gigger</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input type="text" v-model="signupCred.password" placeholder="Password" />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <img-uploader @uploaded="onUploaded"></img-uploader>
        <button>Signup</button>
      </form>
  </div>
</template>

<script>

import imgUploader from '../cmps/img-uploader.vue'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      signupCred: { username: '', password: '', fullname: '', imgUrl : '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    }
  },
  components: {
    imgUploader
  }
}
</script>