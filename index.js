const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  //读取之前的任务
  let list = await db.read()
  //添加一个title任务
  list.push({title, done: false})
  //保存任务到文件
  await db.save(list)
}

module.exports.clear = async () => {
  await db.save([])
}

module.exports.showAll = async () => {
  //读取之前之前的tasks
  let list = await db.read()
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
          .then(answer2=>{
            switch (answer2.action) {
              case 'markAsDone':
                list[index].done = true
                break
              case 'markAsUndone':
                list[index].done = false
                break
              case 'updateTitle':
                inquirer.prompt({
                    type: 'input',
                    name: 'newTitle',
                    message: "请输入新的任务名称",
                  }).then((answer) => {
                  list[index].title = answer['newTitle']
                  db.save(list)
                });
                break
              case 'remove':
                list.splice(index,1)
                break
            }
            db.save(list)
          })
      } else if (index === -2) {
        //新建一个任务
        inquirer.prompt({
          type: 'input',
          name: 'title',
          message: "请输入任务名称",
        }).then((answer) => {
          list.push({
            title:answer.title,
            done:false
          })
          db.save(list)
        });
      }
    })
}