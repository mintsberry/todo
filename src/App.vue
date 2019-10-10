<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
import Home from './views/Home.vue'
export default {
  components: {
    Home
  },
  mounted () {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      let bodyTag = document.getElementsByTagName('body')[0]
      bodyTag.style.height = screen.height + 'px'
    }
    setTimeout(() => {
      window.scrollTo(0, 100)
    }, 1000)
  }
}
</script>
<style lang="scss">

</style>
