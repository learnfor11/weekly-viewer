import create_external_state from 'state_mini'
import { marked } from 'marked'

export
const useState_article = create_external_state()

const useState_article_tokens = create_external_state()
export
function useValue_article_tokens() {
  return useState_article_tokens().value
}

useState_article.subscribe(function watch_raw_article(value) {
  if(value === null)
    useState_article_tokens.set2(null)
  else {
    console.debug('got article', value.length)
    useState_article_tokens.set2(marked.lexer(value))
  }
})