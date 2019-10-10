export default {
  currentIndex: 0,
  todos: [
    {
      icon: 'user',
      name: '个人',
      tasks: [
        {
          id: 1,
          title: 'Dating',
          date: new Date(),
          done: false,
          deleted: false
        }
      ],
      colors: ['#5b9df9', '#47bfff']
    },
    {
      icon: 'briefcase',
      name: '工作',
      tasks: [
        {
          id: 4,
          title: '为应用app设计图标',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 5,
          title: 'HTML/CSS 学习',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 6,
          title: '周报',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 7,
          title: '设计研讨会议',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 8,
          title: 'Vue',
          date: new Date('2019-09-16'),
          done: false,
          deleted: false
        }
      ],
      colors: ['#ff6262', '#ffa947']
    },
    {
      icon: 'home',
      name: '家庭',
      tasks: [
        {
          id: 2,
          title: 'House Keeping',
          date: new Date(),
          done: true,
          deleted: false
        }
      ],
      colors: ['#2c7d59', '#3ba776']
    }
  ],
  selected: null,
  unselect: null,
  editing: null
}
