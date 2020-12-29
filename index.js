const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  //读取之前的任务
  let list = await db.read()
  //添加一个title任务
  list.push({title, done: false})
  //保存任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

//选择task进行操作
function save (list,string){
  db.write(list).then(() => {console.log(string + '成功')}).catch(() => {console.log(string + '失败')})
}
function markAsDone(list, index) {
  list[index].done = true
  save(list,'更改')
}
function markAsUndone(list, index) {
  list[index].done = false
  save(list,'更改')
}
function updateTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'newTitle',
    message: '请输入新的任务名称',
  }).then((answer) => {
    list[index].title = answer['newTitle']
    save(list,'更改')
  })
}
function remove(list, index) {
  list.splice(index, 1)
  save(list,'更改')
}
function askForAction(list, index) {
  const actions = {markAsDone,markAsUndone,updateTitle,remove}
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'action',
        message: '请选择你想要操作的任务',
        choices: [{name: '退出', value: 'quit'},
          {name: '完成', value: 'markAsDone'},
          {name: '未完成', value: 'markAsUndone'},
          {name: '更改任务名称', value: 'updateTitle'},
          {name: '删除', value: 'remove'},],
      },
    )
    .then(answer2 => {
      const action = actions[answer2.action]
      action && action(list, index)
    })
}
function askForCreateTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入任务名称',
  }).then((answer) => {
    list.push({
      title: answer.title,
      done: false
    })
    save(list,'添加')
  })
}
function printTasks(list) {
  inquirer
    .prompt(
      {
        type: 'list',
        name: 'index',
        message: '请选择你想要操作的任务',
        choices: [{name: '退出', value: -1}, ...list.map((task, index) => {
          return {name: `${task.done ? '[√]' : '[_]'} ${index + 1} - ${task.title}`, value: index}
        })
          , {name: '新建任务', value: -2}
        ],
      },
    )
    .then((answer) => {
      let index = answer.index
      if (index >= 0) {
        //操作现有的任务
        askForAction(list, index)
      } else if (index === -2) {
        //新建一个任务
        askForCreateTask(list)
      }
    })
}

module.exports.showAll = async () => {
  //读取之前之前的tasks
  let list = await db.read()
  //打印之前的任务
  printTasks(list)
}