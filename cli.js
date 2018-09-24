#!/usr/bin/env node
const { map, forEach, compose, replace } = require('ramda')
const { readFile, getFilesFromArgs, writeToDist } = require('./src/utils')
const log = require('./src/log')

// The star of the whole show! ✨
const resolve = replace(/^\s+/mg, '')

// Main
const run = finishingMove => {
  if (process.argv[2] !== 'indent') {
    return Promise.reject(Error('Sorry. The only command harmonize currently supports is `indent`. Please try: `ha indent "example/glob-or-filepath/**"'))
  }

  const filePathArgs = process.argv.slice(3)
  const files = getFilesFromArgs(filePathArgs.length ? filePathArgs : ['./'])
  log.releaseTheHarmony(files)

  const mapResolve = map(({ filepath, body }) => ({ filepath, body: resolve(body) }))
  const resolveAndFinish = compose(forEach(finishingMove), mapResolve)
 
  return Promise
    .all(map(readFile, files))
    .then(resolveAndFinish)
}

// Execute
run(writeToDist)
  .then(log.harmonyHasIncreased)
  .catch(err => {
    console.error(err)
  })
