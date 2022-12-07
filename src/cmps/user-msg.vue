<template>
  <div  class="alert content" :class="alive ? alertClass : ''">
    {{ msg?.txt }}
  </div>
</template>


<script>
import { eventBus, SHOW_MSG } from "../services/event-bus.service.js"

export default {
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      console.log(msg);
      this.msg = msg
      var delay = msg.delay || 2400
      this.alive = true
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script>