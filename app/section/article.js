import { createElement as R } from 'react'
import { marked } from 'marked'

import Loading from '../cmp/loading.js'
import { useCurrent } from '../state/query.js'
import { useValue_article_tokens } from '../state/article.js'

export default
function Article() {
  const current = useCurrent()
  const tokens = useValue_article_tokens()
  
  return tokens?
    R('article', {
      dangerouslySetInnerHTML: {
        __html: marked.parser(tokens)
      }
    })
    : R(Loading, null, `加载第 ${current.number} 期 ${current.title || ''}...`)
}