const releaseTheHarmony = files => {
  console.log('Harmonizing ✌️ ... \n\n', files, '\n')
}

const harmonyHasIncreased = () => {
  console.log('\n\nThank you, hero. You have made the world a better place. 🦋 🌺 🐈')
}

const puke = err => {
  console.error(err, '🤮')
}

const thumbsUp = filepath => {
  console.log(filepath, '👍')
}

const ignoring = () => {
  console.log('Skipping files in .gitignore 🏎')
}

const cantIgnore = () => {
  console.warn('.gitignore not found, or improperly formatted. Ignoring node_modules anyway.')
}

module.exports = {
  releaseTheHarmony,
  harmonyHasIncreased,
  puke,
  thumbsUp,
  ignoring,
  cantIgnore
}