<template>
  <transition name="fade">
    <div class="task" v-if="!task.deleted">
      <input :id="id" type="checkbox" :checked="done"  @click="toggleDone({ task })"/>
      <label :for="id">{{ task.title }}</label>
      <transition name="fade">
        <span
          class="task_delete"
          v-show="task.done"
          @click="deleteTask({ task })"
        >
          <i class="icon icon-empty"></i>
        </span>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
let GID = 1
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      id: `task-${GID++}`,
      done: this.task.done
    }
  },
  methods: {
    ...mapMutations(['deleteTask', 'toggleDone'])
  }
}
</script>

<style lang="scss">
.task {
  display: flex;
  position: relative;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.task input {
  display: none;
}
.task label {
  position: relative;
  flex: 1;
  line-height: 20px;
}
.task label:before,
.task label:after {
  content: '';
  display: inline-block;
  margin-right: 20px;
  margin-top: 1px;
  width: 14px;
  height: 14px;
  vertical-align: top;
}
.task label:before {
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: white;
}
.task label:after {
    content: "\E907";
    display: none;
    position: absolute;
    z-index: 10;
    left: -9px;
    top: -9px;
    font: normal normal normal 12px sell-icon;
    float: left;
    font-size: 32px;
}
.task input:checked + label:after {
  display: inline-block;
}
.task_delete {
  padding: 0 10px;
  color: #ccc;
  position: absolute;
  right: 0;
  top: 6px;
  height: 20px;
  .icon{
    font-size: 32px;
  }
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease;
}
</style>
