const releaseTheHarmony = files => {
  console.log('Harmonizing ✌️...\n\n', files, '\n')
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

module.exports = {
  releaseTheHarmony,
  harmonyHasIncreased,
  puke,
  thumbsUp
}