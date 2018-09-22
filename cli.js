#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const fsPromises = fs.promises

// Helpers
const isDir = filepath => fs.lstatSync(filepath).isDirectory()
const readFile = filepath => fsPromises.readFile(filepath, { encoding: 'utf8'})
  .then(body => ({ filepath, body }))
const resolve = str => str.replace(/^\s+/mg, '')


// Execute
const run = finishingMove => {
  const files = process.argv.slice(2)
 
  Promise
    .all(files.map(readFile))
    .then(
      contexts => {
        contexts.map(({ filepath, body }) => ({ filepath, body: resolve(body) })).forEach(finishingMove)
      }
    )
}

const writeToDist = ({ filepath, body }) => {
  const outPath = path.join('dist', filepath)
  // TODO - mkdirp promise version?
  mkdirp(path.dirname(outPath), err => {
    if (err) {
      return console.error(err)
    }
    fsPromises.writeFile(outPath, body)
  })
}

run(writeToDist)
