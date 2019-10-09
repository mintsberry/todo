import { tomorrow } from '../common/js/shared'
export const cuurentIndex = state => state.currentIndex
export const currentTodo = state => state.todos[state.currentIndex]
export const todos = state => state.todos
export const todayTasks = state => {
  const tasks = []
  state.todos.forEach(todo => {
    todo.tasks.forEach(task => {
      if (task.date <= tomorrow && !task.done && !task.deleted) {
        tasks.push(task)
      }
    })
  })
  return tasks
}