<template>
  <div class="gradient_color"
  :class="{active: active}"
  :style="{backgroundImage: gradientColor}">
  </div>
</template>
<script>
export default {
  props: {
    colors: {
      type: Array
    },
    active: {
      type: Boolean
    }
  },
  computed: {
    gradientColor () {
      const colorBottom = `color-stop(30%, ${this.colors[0]})`
      const colorTop = `to(${this.colors[1]})`
      return `-webkit-gradient(linear, left bottom, left top, ${colorBottom}, ${colorTop})`
    }
  }
}
</script>
<style lang="scss" scoped>
.gradient_color {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: opacity .5s ease;
}
.active {
  opacity: 1;
}
</style>
