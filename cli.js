#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp-promise')
const fsPromises = fs.promises
const { map, filter, forEach, pipe, replace } = require('ramda')

// Helpers
const isDir = filepath => fs.lstatSync(filepath).isDirectory()
const readFile = filepath => fsPromises.readFile(filepath, { encoding: 'utf8'})
  .then(body => ({ filepath, body }))
const puke = err => console.error('🤮', err)
const thumbsUp = filepath => console.log('👍', filepath)

// The star of the whole show
const resolve = replace(/^\s+/mg, '')

// Execute
const run = finishingMove => {
  const args = process.argv.slice(2)
  console.log('⏳ Harmonizing ✌️', args)

  const resolveAll = ({ filepath, body }) => ({ filepath, body: resolve(body) })
  const filtered = filter(x => !isDir(x), args)
 
  return Promise
    .all(map(readFile, filtered))
    .then(map(resolveAll))
    .then(forEach(finishingMove))
}

const writeToDist = ({ filepath, body }) => {
  const outPath = path.join('dist', filepath)
  mkdirp(path.dirname(outPath))
    .then(() => fsPromises.writeFile(outPath, body))
    .then(thumbsUp(filepath))
    .catch(puke)
}

run(writeToDist)
  .then(() => console.log('🦋 The world will be a better place 🌺'))
