import { useMemo, createElement as R } from 'react'
import { useValue_article_tokens } from '../state/article.js'

export default
function Menu({ _raw_tokens }) {
  const tokens = useValue_article_tokens()
  const list = useMemo(function make_archors_list() {
    return tokens
      ?.filter(token => token.type === 'heading' && token.depth === 2)
      .map(token => token.text)
  }, [tokens])

  if(tokens)
    return R('menu', null,
      list?.map(title =>
        R('li', { key: title },
          R('a',
            {
              href: '#' + title.replaceAll(' ', '-').toLowerCase()
            },
            title
          )
        )
      )
  )
}
