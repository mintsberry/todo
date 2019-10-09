<template>
  <div class="home">
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
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: white;
}
</style>
