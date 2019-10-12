<template>
  <div class="float_button" v-if="selected">
    <i class="icon icon-plus"></i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['selected'])
  }
}
</script>
<style lang='scss' >
.float_button {
  position: fixed;
  z-index: 999;
  text-align: center;
  bottom: 48px;
  right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #5A89E6;
  box-shadow:0px 1px 4px #999;
  .icon {
    font-size: 48px;
    line-height: 48px;
    color: white;
  }
}

</style>
