#!/usr/bin/env node

const argv = process.argv.slice(2)

const str = ` \t  my string
  \t\t\tanother string
`

function resolve(str) {
  return str.replace(/^\s+/mg, '')
}

console.log(resolve(str))
