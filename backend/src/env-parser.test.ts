import { parse } from './env-parser.js'
import { describe, it, expect } from 'vitest'

describe('.env parser', () => {
  const envFile = `# This is my .env file

first=one
 leadingWhitespace=two
trailingWhitespace=three   
  leadingAndTrailing=four  
  
# another comment
withQuotes='five'
withEqualSign="six=seven"
withTrailingComment=eight # this is a comment
withHash="nine # ten"

multi="apa
boll
cykel" # ignore this comment


empty=   '' 
whitespace = ' eleven '

`

  it('should parse key-value pairs', () => {
    const parsed = parse(envFile)
    expect(parsed).toStrictEqual({
      first: 'one',
      leadingWhitespace: 'two',
      trailingWhitespace: 'three',
      leadingAndTrailing: 'four',
      withQuotes: 'five',
      withEqualSign: 'six=seven',
      withTrailingComment: 'eight',
      withHash: 'nine # ten',
      multi: `apa
boll
cykel`,
      empty: '',
      whitespace: ' eleven ',
    })
  })
})
