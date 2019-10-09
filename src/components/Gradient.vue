<template>
  <div class="gradient">
    <GradientColor
      v-for="(todo, index) in todos"
      :key="index"
      :colors="todo.colors"
      :active="index <= currentIndex"
    />
  </div>
</template>
<script>
import GradientColor from './GraidientColor.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    GradientColor
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'todos'
    ])
  }
}
</script>
<style lang="scss" scoped>
.gradient {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>
