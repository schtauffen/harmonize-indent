#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp-promise')
const fsPromises = fs.promises
const ignoreFiles = require('./ignore-files')
const { map, reduce, filter, forEach, compose, replace, test } = require('ramda')

// Helpers
const isDir = filepath => fs.lstatSync(filepath).isDirectory()
const readFile = filepath => fsPromises.readFile(filepath, { encoding: 'utf8'})
  .then(body => ({ filepath, body }))
const puke = err => console.error(err, '🤮')
const thumbsUp = filepath => console.log(filepath, '👍')

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
    .then(thumbsUp(filepath))
    .catch(puke)
}

// Messaging
const logBegin = files => console.log('Harmonizing ✌️...\n\n', files, '\n')
const logFinish = () => console.log('\n\nThank you, hero. You have made the world a better place. 🦋 🌺 🐈')

// The star of the whole show
const resolve = replace(/^\s+/mg, '')

// Main
const run = finishingMove => {
  // const files = filter(x => !isDir(x), )
  const files = getFilesFromArgs(process.argv.slice(2))
  logBegin(files)

  const mapResolve = map(({ filepath, body }) => ({ filepath, body: resolve(body) }))
  const resolveAndFinish = compose(forEach(finishingMove), mapResolve)
 
  return Promise
    .all(map(readFile, files))
    .then(resolveAndFinish)
}

// Execute
run(writeToDist)
  .then(logFinish)
