export function addTask ({ commit, state }, { title, date }) {
  let todos = state.todos
  let selected = state.selected
  todos.forEach(element => {
    if (element.name === selected.todo.name) {
      let task = element.tasks
      let id = task[task.length - 1].id + 1
      task.push({
        id,
        title,
        date,
        done: false,
        deleted: false
      })
    }
  })
}
