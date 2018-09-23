#!/usr/bin/env node
const { map, forEach, compose, replace } = require('ramda')
const { readFile, getFilesFromArgs, writeToDist } = require('./src/utils')
const log = require('./src/log')

// The star of the whole show! ✨
const resolve = replace(/^\s+/mg, '')

// Main
const run = finishingMove => {
  const files = getFilesFromArgs(process.argv.slice(2))
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
