#!/usr/bin/env node
const fs = require('fs')
const fsPromises = fs.promises

// Helpers
const isDir = path => fs.lstatSync(path).isDirectory()
const readFile = file => fsPromises.readFile(file, { encoding: 'utf8'})
const resolve = str => str.replace(/^\s+/mg, '')


// Execute
const run = finishingMove => {
  const files = process.argv.slice(2)
 
  Promise
    .all(files.map(readFile))
    .then(
      strings => {
        strings.map(resolve).forEach(finishingMove)
      }
    )
}

run(a => { console.log(a) })

