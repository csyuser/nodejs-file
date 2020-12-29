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
    console.log(words);
    api.add(words+'\n')
  });

program.parse(process.argv);
