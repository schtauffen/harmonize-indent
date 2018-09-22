const fs = require('fs')
const path = require('path')
const { __, curryN, filter, identity, map, not, pipe, split, trim } = require('ramda')
const mm = require('micromatch')

const handleIggy = pipe(
  split('\n'),
  map(trim),
  filter(identity)
)

const getIgnoredGlobs = () => {
  try {
    const gitignore = fs.readFileSync(path.join(__dirname, './.gitignore'), { encoding: 'utf8' })
    return handleIggy(gitignore)
  } catch (err) {
    console.warn('.gitignore not found, or improperly formatted')
    return ['node_modules/']
  }
}

const contains = curryN(2, mm.contains)
const ignoreFiles = filter(pipe(contains(__, getIgnoredGlobs()), not))

module.exports = ignoreFiles
