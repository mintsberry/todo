// import { tomorrow, yesterday } from '../common/js/shared'
import { loadUser, loadWork, loadHome } from '../common/js/cache'
export default {
  currentIndex: 0,
  todos: [
    {
      icon: 'user',
      name: '个人',
      tasks: loadUser(),
      colors: ['#5b9df9', '#47bfff']
    },
    {
      icon: 'briefcase',
      name: '工作',
      tasks: loadWork(),
      colors: ['#ff6262', '#ffa947']
    },
    {
      icon: 'home',
      name: '家庭',
      tasks: loadHome(),
      colors: ['#2c7d59', '#3ba776']
    }
  ],
  selected: null,
  unselect: null,
  editing: null
}
