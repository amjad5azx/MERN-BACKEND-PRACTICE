const chalk = require('chalk');
// console.log(chalk.blue.italic.inverse('Hello world!'));
var validator = require('validator');
var res=validator.isEmail('th@foobar.comm');
console.log(res ? chalk.green.inverse(res):chalk.red.inverse(res));