<template>
  <div class="home"
  @touchstart="touchStart"
  @touchmove="perventPullUp">
    <AppBar :title="'TODO'" :left="'list'" :right="'search'"/>
    <Avatar/>
    <Gradient/>
    <TodoList/>
    <TodoDetail/>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
import Gradient from '../components/Gradient.vue'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
export default {
  components: {
    AppBar,
    Avatar,
    Gradient,
    TodoList,
    TodoDetail
  },
  methods: {
    touchStart (event) {
      this.touch = {}
      this.touch.startY = event.touches[0].clientY
    },
    perventPullUp (event) {
      this.touch.endY = event.touches[0].clientY
      if (this.touch.endY - this.touch.startY > 0) {
        event.preventDefault()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  color: white;
}
</style>
