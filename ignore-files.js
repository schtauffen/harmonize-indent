const fs = require('fs')
const { filter, identity, map, pipe, split, trim } = require('ramda')
const mm = require('micromatch')

const handleIggy = pipe(
  split('\n'),
  map(trim),
  filter(identity)
)

let globs
try {
  const gitignore = fs.readFileSync('./.gitignore', { encoding: 'utf8' })
  globs = handleIggy(gitignore)
} catch (err) {
  console.warn('.gitignore not found, or improperly formatted')
  globs = []
}

console.log(globs)
