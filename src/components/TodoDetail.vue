<template>
  <transition name="show" @enter="handleEnter" @leave="handleLeave">
    <div class="todo-detail" v-if="selected">
      <AppBar @left="unselectTodo" :left="'arrow_left'"/>
      <Todo :todo="selected.todo" :selected="true" @close="unselectTodo" ref="todo" />
      <FloatButton />
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AppBar from './AppBar.vue'
import Todo from './Todo.vue'
import FloatButton from './FloatButton.vue'
const BOOTOM_KEEP = 40
export default {
  components: {
    AppBar,
    Todo,
    FloatButton
  },
  computed: {
    ...mapState(['selected', 'unselect'])
  },
  methods: {
    _bodyOffset () {
      let height = document.querySelector('.todo_head').clientHeight + document.querySelector('.todo_outline').clientHeight
      let offsetHight = document.documentElement.clientHeight * 0.5 - height - BOOTOM_KEEP
      this.$refs.todo.$el.querySelector('.todo_body').style.transform = `translate3d(0, ${offsetHight}px, 0)`
    },
    handleEnter (el) {
      Object.assign(el.style, {
        top: `${this.selected.rect.top}px`,
        left: `${this.selected.rect.left}px`,
        width: `${this.selected.rect.width}px`,
        height: `${this.selected.rect.height}px`
      })
      setTimeout(() => {
        Object.assign(el.style, {
          top: 0,
          left: 0,
          width: `${this.selected.rect.appWidth}px`,
          height: `${this.selected.rect.appHeight}px`
        })
      }, 0)
    },
    handleLeave (el) {
      setTimeout(() => {
        Object.assign(el.style, {
          top: `${this.unselect.rect.top}px`,
          left: `${this.unselect.rect.left}px`,
          width: `${this.unselect.rect.width}px`,
          height: `${this.unselect.rect.height}px`
        })
      }, 0)
      this._bodyOffset()
    },
    ...mapMutations(['unselectTodo'])
  }
}
</script>

<style lang="scss">
.todo-detail {
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  background-color: white;
  color: #666;
  will-change: top, left, width, height;
  .todo {
    margin: 0;
    margin-top: -44px;
    padding: 0 20px;
    box-shadow: none;
  }
  .todo_head,
  .todo_body {
    transform: translate3d(0, 88px, 0)
  }
  .todo_menu {
    opacity: 0;
  }
  .todo_tasks {
    opacity: 1;
    transform: scale3d(1, 1, 1) !important;
  }
  .app-bar {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  // .float_button {
  // position: fixed;
  // z-index: 999;
  // bottom: 18px;
  // right: 18px;
  // width: 48px;
  // height: 48px;
  // border-radius: 50%;
  // background-color: #5A89E6;
  // box-shadow:0px 1px 4px #999;
  //   .icon {
  //     font-size: 48px;
  //     line-height: 48px;
  //     color: white;
  //   }
  // }
  &.show-leave-to,
  &.show-enter {
    border-radius: 8px;

    .todo {
      padding: 0;
    }
    .todo_head {
      transform: translate3d(0, 0, 0);
    }
    .todo_menu {
      opacity: 1;
    }
    .todo_tasks {
      opacity: 0;
      transform: scale3d(1, 0, 1);
    }
    .app-bar {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    .float_button {
      opacity: 0;
      transform: scale(0);
    }
  }
  &.show-enter-active,
  &.show-leave-active {
    transition: all .5s ease;

    .float_button,
    .todo,
    .todo_head,
    .todo_body,
    .todo_menu,
    .todo_tasks,
    .button
    .app-bar {
      transition: all .5s ease;
    }
  }
}

</style>
