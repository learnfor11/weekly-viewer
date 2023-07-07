import create_external_state from 'state_mini'
import { marked } from 'marked'

export
const useState_article = create_external_state()

useState_article.subscribe(function watch_raw_article(value) {
  console.debug('got article', value.length)
  const tokens = marked.lexer(value)
  console.debug({ tokens })
})