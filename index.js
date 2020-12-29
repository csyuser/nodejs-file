const fs = require('fs')
const p = require('path')
const home = process.env.HOME || require('os').homedir()
const dbPath = p.join(home,'.todo')


module.exports.add=(title)=>{
  //读取之前的任务
  fs.readFile(dbPath,{flag:'a+'},(err,data)=>{
    if (err) return
    let list = []
    try{
      list = JSON.parse(data.toString())
    } catch (err2){list = []}
    list.push(title)
    fs.writeFile(dbPath,list,(err3)=>{
      if (err3) console.log('出错啦')
      console.log('chenggongla')
    })
  })
  //添加一个title任务
  //保存任务到文件
}