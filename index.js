const db = require('./db')



module.exports.add = async (title) => {
  //读取之前的任务
  let list = await db.read()
  //添加一个title任务
  list.push({title, done: false})
  //保存任务到文件
  await db.save(list)
}