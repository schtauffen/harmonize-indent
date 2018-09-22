#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp-promise')
const fsPromises = fs.promises
const { map, filter, forEach, replace } = require('ramda')

// Helpers
const isDir = filepath => fs.lstatSync(filepath).isDirectory()
const readFile = filepath => fsPromises.readFile(filepath, { encoding: 'utf8'})
  .then(body => ({ filepath, body }))
const puke = err => console.error('PUKE:', err)
const wink = filepath => console.log('WINK:', filepath)

// The star of the whole show
const resolve = replace(/^\s+/mg, '')


// Execute
const run = finishingMove => {
  const files = filter(x => !isDir(x), process.argv.slice(2))
  const resolveAll = ({ filepath, body }) => ({ filepath, body: resolve(body) })
 
  Promise
    .all(map(readFile, files))
    .then(map(resolveAll))
    .then(forEach(finishingMove))
}

const writeToDist = ({ filepath, body }) => {
  const outPath = path.join('dist', filepath)
  mkdirp(path.dirname(outPath))
    .then(() => fsPromises.writeFile(outPath, body))
    .then(wink(filepath))
    .catch(puke)
}


run(writeToDist)
