<template>
  <div
  class="todo-list"
  :class="{ 'select': !!selected }"
  @touchstart="todoListTouchStart"
  @touchmove="todoListTouchMove"
  @touchend="todoListTouchEnd"
  >
    <ul :style="{width: `${todos.length * 100}%`}">
      <li
        v-for="todo in todos"
        :key="todo.name"
        :style="{ transform: diff}"
      >
      <Todo
        :todo="todo"
        :selected="selected && todo === selected.todo"
        @select="selectTodo"
      ></Todo>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Todo from './Todo.vue'
export default {
  components: {
    Todo
  },
  computed: {
    diff () {
      return `translate3d(-${this.currentIndex * 100}%, 0, 0)`
    },
    ...mapGetters([
      'todos',
      'currentIndex',
      'selected'
    ])
  },
  methods: {
    todoListTouchStart (ev) {
      this.touch = {}
      this.touch.startX = ev.touches[0].clientX
      this.touch.endX = 0
    },
    todoListTouchMove (ev) {
      this.touch.endX = ev.touches[0].clientX
    },
    todoListTouchEnd (ev) {
      if (!this.touch.endX || Math.abs(this.touch.endX - this.touch.startX) < 10) {
        return
      }
      if (this.touch.endX < this.touch.startX) {
        this.nextTodo()
      } else {
        this.prevTodo()
      }
    },
    ...mapMutations([
      'selectTodo',
      'nextTodo',
      'prevTodo'
    ])
  }
}
</script>
<style lang="scss">
.todo-list {
  padding: 0 32px;
  height: 50%;
  transition: all .5s ease;

  > ul,
  > ul > li {
    display: flex;
    height: 100%;
  }

  > ul > li {
    flex: 1;
    transition: all .5s ease;
  }
  .todo {
    border-radius: 8px;
    background-color: white;
    flex: 1;
  }
  &.select {
    transform: scaleX(1.25)
  }
}
</style>
