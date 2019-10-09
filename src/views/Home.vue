<template>
  <div class="home">
    <AppBar :title="'TODO'" :left="'list'" :right="'search'"/>
    <Avatar/>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
export default {
  components: {
    AppBar,
    Avatar
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
