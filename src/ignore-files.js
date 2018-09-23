const fs = require('fs')
const path = require('path')
const { __, curryN, filter, identity, map, not, pipe, split, trim } = require('ramda')
const mm = require('micromatch')

const handleIggy = pipe(
  split('\n'),
  map(trim),
  filter(identity)
)

const glob = (() => {
  try {
    const pathToGitIgnore = path.join(process.cwd(), '.gitignore')
    const gitignore = fs.readFileSync(pathToGitIgnore, { encoding: 'utf8' })
    return handleIggy(gitignore)
  } catch (err) {
    console.warn('.gitignore not found, or improperly formatted')
    return ['node_modules/']
  }
})().concat('.git')

const contains = curryN(2, mm.contains)
const ignoreFiles = filter(pipe(contains(__, glob), not))

module.exports = ignoreFiles
