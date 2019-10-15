import { tomorrow, yesterday } from '../common/js/shared'
export const currentIndex = state => state.currentIndex
export const currentTodo = state => state.todos[state.currentIndex]
export const todos = state => state.todos
export const selected = state => state.selected
export const todayTasks = state => {
  const tasks = []
  state.todos.forEach(todo => {
    todo.tasks.forEach(task => {
      if (new Date(task.date) >= yesterday && new Date(task.date) <= tomorrow && !task.done && !task.deleted) {
        tasks.push(task)
      }
    })
  })
  return tasks
}
