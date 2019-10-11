<template>
  <div class="todo" :class="{ select: selected }" ref="todo">
    <div class="todo_head" @click="handleClick">
      <div class="todo_icon" :style="{color}">
        <i :class="['icon', `icon-${todo.icon}`]"></i>
      </div>
      <div class="todo_menu">
        <i class="icon icon-application"></i>
      </div>
    </div>
    <div class="todo_body" ref="todo_body">
      <div class="todo_outline">
        <p class="todo_tips">{{ todo.tasks.length }} Task</p>
        <h3 class="todo_title">{{todo.name}}</h3>
        <div class="todo_progress">
          <span class="todo_progress_line">
            <i :style="{ width: progress, backgroundImage: progressColor}"></i>
          </span>
          <span class="todo_progress_num">{{progress}}</span>
        </div>
      </div>
      <div class="todo_tasks">
        <h4 class="todo_subtitle" v-if="todayTasks.length">Today</h4>
        <ul>
          <li v-for="task in todayTasks" :key="task.id">
            <task :todo="todo" :task="task"/>
          </li>
        </ul>
        <h4 class="todo_subtitle" v-if="tomorrowTasks.length">Tomorrow</h4>
        <ul>
          <li v-for="task in tomorrowTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
        <h4 class="todo_subtitle" v-if="outdatedTasks.length">Outdated</h4>
        <ul>
          <li v-for="task in outdatedTasks" :key="task.id">
            <task :todo="todo" :task="task" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Task from './Task.vue'
import { today, tomorrow } from '../common/js/shared'
const BOOTOM_KEEP = 40
export default {
  components: {
    Task
  },
  props: {
    todo: {
      type: Object,
      require: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color () {
      return this.todo.colors[0]
    },
    progress () {
      const totalCount = this.todo.tasks.filter(t => !t.deleted).length
      const doneCount = this.todo.tasks.filter(t => !t.deleted && t.done).length
      const percent = (doneCount / totalCount) * 100 | 0
      return `${percent}%`
    },
    progressColor () {
      const colorLeft = `color-stop(30%, ${this.todo.colors[0]})`
      const colorRight = `to(${this.todo.colors[1]})`
      return `-webkit-gradient(linear, left bottom, right bottom, ${colorLeft}, ${colorRight})`
    },
    todayTasks () {
      return this.todo.tasks.filter(task => {
        return task.date >= today && task.date < tomorrow
      })
    },
    tomorrowTasks () {
      return this.todo.tasks.filter(task => {
        return task.date >= tomorrow
      })
    },
    outdatedTasks () {
      return this.todo.tasks.filter(task => {
        return task.date < today
      })
    }
  },
  mounted () {
    if (!this.selected) {
      window.addEventListener('resize', () => {
        this._bodyOffset()
      })

      setTimeout(() => {
        this._bodyOffset()
      }, 100)
    }
  },
  methods: {
    handleClick () {
      const elRect = this.$el.getBoundingClientRect()
      const todo = this.todo
      const rect = {}
      rect.top = elRect.top
      rect.left = elRect.left
      rect.width = elRect.width
      rect.height = elRect.height
      rect.appWidth = document.documentElement.clientWidth
      rect.appHeight = document.documentElement.clientHeight
      this.$emit('select', { rect, todo })
    },
    _bodyOffset () {
      let height = document.querySelector('.todo_head').clientHeight + document.querySelector('.todo_outline').clientHeight
      let offsetHight = this.$refs.todo.clientHeight - height - BOOTOM_KEEP
      this.$refs.todo_body.style.transform = `translate3d(0, ${offsetHight}px, 0)`
    }
  }
}
</script>
<style lang="scss">
.todo {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
  .select {
    visibility: hidden;
  }
  .todo_head {
    display: flex;
    padding: 20px;
    height: 44px;
    justify-content: space-between;
    align-items: flex-start;
    transform: translate3d(0,0,0);
    will-change: transform;

    .todo_icon {
      display: flex;
      width: 44px;
      height: 44px;
      border: 1px solid #eee;
      border-radius: 100%;
      justify-content: center;
      align-items: center;
      font-size: 36px
    }

    .todo_menu {
      display: flex;
      width: 44px;
      height: 44px;
      color: #999;
      justify-content: center;
      align-items: center;
      font-size: 36px;
    }
  }
  .todo_body {
    padding: 0 20px;
    // transform: translate3d(0, 189px, 0);
    will-change: transform;
    .todo_tips {
    opacity: .6;
    font-size: 14px;
    font-weight: 600;
    }
    .todo_title {
      margin-top: 12px;
      font-size: 32px;
    }
    .todo_progress {
      display: flex;
      align-items: center;
      margin-top: 30px;
    }
    .todo_progress_line {
      margin-right: 10px;
      flex: 1;
      height: 3px;
      background-color: #eee;
      i {
        display: block;
        height: 100%;
        transition: all .3s ease;
      }
    }
    .todo_progress_num {
      font-size: 12px;
    }
    .todo_tasks {
      opacity: 1;
      transform: scale3d(1, 0, 1)
    }
    .todo_subtitle {
      margin-top: 32px;
      margin-bottom: 8px;
      color: #999
    }
  }

}
</style>
