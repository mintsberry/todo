<template>
  <transition name="slider"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    >
    <div class="add-todo" v-if="showFlag" >
      <AppBar :left="'close'" :title="'新的任务'" @left="close"></AppBar>
      <div class="add_body">
        <div class="input_task">
          <p class="tips">你有什么工作计划?</p>
          <input type="text" class="task_input" placeholder="Task" ref="input" id="task_input" >
        </div>
        <div class="task_detail">
          <div class="category">
            <i class="icon icon-user"></i>
            <span class="text">{{selected.todo.name}}</span>
          </div>
          <div class="time" @click="changeTime">
            <i class="icon icon-clock"></i>
            <transition-group name="fade" mode="out-in">
              <span class="text" v-if="today" :key="0">Today</span>
              <span class="text" v-else :key="1">Tomorrow</span>
            </transition-group>
          </div>
        </div>
        <div class="bottom_btn" ref="btn" @click="add">
          <i class="icon icon-plus"></i>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import AppBar from './AppBar.vue'
import Todo from '../common/js/todo'
import { mapGetters, mapActions } from 'vuex'
import { today, tomorrow } from '../common/js/shared'
export default {
  components: {
    AppBar
  },
  props: {
    btnStyle: {
      type: Object
      // require: true
    }
  },
  data () {
    return {
      showFlag: false,
      today: true
    }
  },
  computed: {
    ...mapGetters([
      'selected'
    ])
  },
  watch: {
    showFlag (newValue) {
      if (newValue) {
        this.$nextTick(() => {
          document.getElementById('task_input').focus()
        })
      }
    }
  },
  methods: {
    changeTime () {
      this.today = !this.today
    },
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = true
    },
    close () {
      this.hide()
      this.$emit('hide')
    },
    beforeEnter () {
      Object.assign(this.$refs.btn.style, {
        bottom: '48px',
        right: '16px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        transform: 'translate3d(0, -10px, 0)'
      })
    },
    add () {
      let content = this.$refs.input.value
      if (content.trim().length === 0) {
        // this.$refs.input.classList.remove('shake')
        this.$refs.input.classList.add('shake')
        setTimeout(() => {
          this.$refs.input.classList.remove('shake')
        }, 300)
        return
      }
      let data = this.today ? today : tomorrow
      let todo = new Todo(content, data)
      this.addTask(todo)
      this.close()
    },
    enter (el, done) {
      this.$refs.btn.style.transition = 'all .5s ease'
      setTimeout(() => {
        Object.assign(this.$refs.btn.style, {
          bottom: '0px',
          right: '0px',
          width: '100%',
          borderRadius: '',
          transform: ''
        })
      }, 0)
      this.$refs.btn.addEventListener('transitionend', done)
    },
    afterEnter () {
      this.$refs.btn.style.transition = ''
    },
    leave () {
      Object.assign(this.$refs.btn.style, {
        bottom: '48px',
        right: '16px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        transform: 'translate3d(0, -10px, 0)'
      })
    },
    ...mapActions([
      'addTask'
    ])
  }
}
</script>
<style lang="scss" scoped>
.add-todo {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  &.slider-enter,
  &.slider-leave-to {
    transform: translate3d(0, 10px, 0);
    opacity: 0;
        // background: rgba(255,255,255,1);
  }
  &.slider-enter-active,
  &.slider-leave-active {
    transition: all .5s ease;

  }
  .add_body {
    padding: 0 20px;
  }
  .close {
    position: fixed;
    height: 44px;
    .icon {
      // color: #eee;
      font-size: 38px;
    }
  }
  .input_task {
    padding: 100px 20px 0px 20px;
    font-size: 12px;
    color: #999;
    .tips {
      margin-bottom: 8px;
    }
    .task_input {
      box-sizing: border-box;
      padding: 4px;
      height: 40px;
      background-color: #F4F6F8;
      width: 100%;
      font-size: 14px;
      color: rgba(0,0,0,0.9);
      border: none;
      border-radius: 4px;
      outline-style: none;
      border-radius: 4px;
      &:focus{
        outline: 0;
      }
      &::placeholder{
        color: #C0C4CC;
        font-weight: 200;
      }
      &.shake {
      animation:shake ;
      animation-duration: .3s;
      animation-fill-mode: both;
      }
    }
  }
  .task_detail {
    margin-top: 48px;
    padding: 20px;
    color: #999;
    .category {
      height: 48px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .icon {
        font-size: 32px;
        line-height: 48px
      }
      .text {
        display: inline-block;
        line-height: 48px;
        font-size: 14px;
        vertical-align: top;
      }
    }
    .time {
      height: 48px;
      border-bottom: 1px solid #eee;
      .icon {
        font-size: 32px;
        line-height: 48px
      }
      .text {
        display: inline-block;
        position: absolute;
        line-height: 48px;
        font-size: 14px;
        vertical-align: top;
        &.fade-enter {
          transform: translate3d(100%, 0, 0);
          opacity: 0;
        }
        &.fade-leave-to {
          transform: translate3d(100%, 0, 0);
          opacity: 0;
        }
        &.fade-enter-active,
        &.fade-leave-active {
          transition: all .5s ease;
        }
      }

    }
  }
  .bottom_btn {
  position: fixed;
  z-index: 999;
  text-align: center;
  width: 100%;
  right: 0;
  bottom: 0;
  background-color: #5A89E6;
  transition: all .3s ease;
    .icon {
      font-size: 48px;
      line-height: 48px;
      color: white;
    }
  }
}
@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  20%,
  60%,
  100% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }

  40%,
  70%,
  80% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
}

</style>
