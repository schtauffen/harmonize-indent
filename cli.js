#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp-promise')
const fsPromises = fs.promises
const { map, filter, forEach, compose, replace } = require('ramda')

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
  const files = filter(x => !isDir(x), process.argv.slice(2))
  console.log('Harmonizing ✌️...\n', files)

  const mapResolve = map(({ filepath, body }) => ({ filepath, body: resolve(body) }))
  const resolveAndFinish = compose(forEach(finishingMove), mapResolve)
 
  return Promise
    .all(map(readFile, files))
    .then(resolveAndFinish)
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
