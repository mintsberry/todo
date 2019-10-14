import { saveTodo } from '../common/js/cache'

export function addTask ({ commit, state }, { title, date }) {
  let todos = state.todos
  let selected = state.selected
  todos.forEach(element => {
    if (element.name === selected.todo.name) {
      let task = element.tasks
      let id = task.length !== 0 ? task[task.length - 1].id + 1 : 1
      task.push({
        id,
        title,
        date,
        done: false,
        deleted: false
      })
      saveTodo(selected.todo.name, task)
    }
  })
}
