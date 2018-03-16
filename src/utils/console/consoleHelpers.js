import moment from 'moment'
import chalk from 'chalk'
import util from 'util'


const consoleLog    =   console.log
const consoleWarn   =   console.warn
const consoleError  =   console.error
const consoleInfo   =   console.info
const consoleDebug  =   console.debug
const consoleDir    =   console.dir
const consoleTrace  =   console.trace

const ConsoleHelpers = (() => {

  console.log = function() {
    const timestamp = chalk.bold.dim(`| ${moment().format(`MM/DD/YYYY || HH:mm:ss:SSS`)} |`)
    Array.prototype.unshift.call(arguments, chalk.white.underline(timestamp))
    consoleLog.call(this, chalk.yellow(...arguments))
  }

  console.info = function() {
    consoleInfo.call(this, chalk.bold.whiteBright(...arguments))
  }

  console.warn = function() {
      const timestamp = `${chalk.underline(`| ${moment().format(`MM/DD/YYYY || HH:mm:ss:SSS`)} |`)} ${chalk.bold('[ WARNING ]:')} `
      Array.prototype.unshift.call(arguments, chalk.yellowBright(timestamp))
      consoleWarn.call(this, chalk.bold.yellowBright(...arguments))
  }

  console.error = function() {
    const timestamp = `${chalk.underline(`| ${moment().format(`MM/DD/YYYY || HH:mm:ss:SSS`)} |`)} | ${chalk.bold('[ ERROR ]:')} `
    Array.prototype.unshift.call(arguments, chalk.inverse.redBright(timestamp))
    consoleError.call(this, chalk.bold.redBright(...arguments))
  }

  console.debug = function() {
    const timestamp = `${chalk.underline(`| ${moment().format(`MM/DD/YYYY || HH:mm:ss:SSS`)} |`)} [ DEBUG ]: `
    Array.prototype.unshift.call(arguments, chalk.magenta(timestamp))
    consoleDebug.call(this, chalk.bold.blueBright(...arguments))
  }

  console.dir = function() {
      const timestamp = `| ${moment().format(`MM/DD/YYYY || HH:mm:ss:SSS`)} | [ DIR ]: `
      Array.prototype.unshift.call(arguments, timestamp)
      consoleDir.apply(this, arguments)
  }

  console.trace = function() {
      const timestamp = `| ${moment().format(`MM/DD/YYYY || HH:mm:ss:SSS`)} | [ TRACE ]: `
      Array.prototype.unshift.call(arguments, timestamp)
      consoleTrace.apply(this, arguments)
  }

})()


export default ConsoleHelpers
