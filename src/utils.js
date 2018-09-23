const mkdirp = require('mkdirp-promise')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const ignoreFiles = require('./ignore-files')
const { map, reduce, } = require('ramda')
const log = require('./log')

const isDir = filepath => fs.lstatSync(filepath).isDirectory()

const readFile = filepath => fsPromises.readFile(filepath, { encoding: 'utf8'})
  .then(body => ({ filepath, body }))

const getFilesFromArgs = args => {
  const filtered = ignoreFiles([].concat(args))

  return reduce((accumulator, current) => {
    if (isDir(current)) {
      const files = fs.readdirSync(current).map(file => `${current}/${file}`)
      return accumulator.concat(files)
    } else {
      return accumulator.concat(current)
    }
  }, [], filtered)
}

const writeToDist = ({ filepath, body }) => {
  mkdirp(path.dirname(filepath))
    .then(() => fsPromises.writeFile(filepath, body))
    .then(log.thumbsUp(filepath))
    .catch(log.puke)
}

module.exports = {
  readFile,
  getFilesFromArgs,
  writeToDist
}