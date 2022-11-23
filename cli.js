#!/usr/bin/env node
const {program} = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

program
  .version(pkg.version)
program
  .command('add')
  .description('add a task')
  .action((command) => {
    let words = command.args.join(' ')
    api.add(words).then(() => {console.log('添加成功')}).catch(() => {console.log('添加失败')})
  })
program
  .command('clear')
  .description('clear tasks')
  .action(() => {
    api.clear().then(() => {console.log('删除成功')}).catch(() => {console.log('删除失败')})
  })
program
  .command('list')
  .description('list tasks')
  .action(() => {
    void api.showAll()
  })

program.parse(process.argv)