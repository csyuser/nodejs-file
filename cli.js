const { program } = require('commander');
const api = require('./index.js')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program
  .command('add')
  .description('add a task')
  .action((command) => {
    let words = command.args.join(' ')
    api.add(words).then(()=>{console.log('添加成功')}).catch(()=>{console.log('添加失败')})
  });

program.parse(process.argv);
