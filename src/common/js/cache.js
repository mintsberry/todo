export function loadUser () {
  let user = localStorage.getItem('__个人__')
  let val = deserialize(user)
  return val || []
}
export function loadWork () {
  let work = localStorage.getItem('__工作__')
  let val = deserialize(work)
  return val || []
}
export function loadHome () {
  let home = localStorage.getItem('__家庭__')
  let val = deserialize(home)
  return val || []
}

export function saveTodo (name, todo) {
  localStorage.setItem(`__${name}__`, JSON.stringify(todo))
}

function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}
