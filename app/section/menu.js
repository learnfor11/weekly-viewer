import { useMemo, createElement as R } from 'react'
import { useValue_article_tokens } from '../state/article.js'

export default
function Menu() {
  console.debug('rendering Menu')
  const tokens = useValue_article_tokens()

  const list = useMemo(function make_archors_list() {
    if(!tokens) return

    const result = []
    for(let item of tokens)
      if(item.type == 'heading' && item.depth == 2)
        result.push({
          title: item.text,
          children: []
        })
      else
        find_links(item)
    console.debug('parsed title list', result)
    return result

    function find_links(item) {
      if(item.type == 'link') {
        result.slice(-1)[0]?.children.push({
          title: item.text
        })
        return
      } else {
        if(item.tokens)
          item.tokens.forEach(find_links)
      }
    }
  }, [tokens])
  
  if(tokens)
    return R('menu', null,
      list?.map(item =>
        R('li', { key: item.title },
          R('a',
            {
              href: '#' + item.title.replaceAll(' ', '-').toLowerCase()
            },
            item.title
          )
        )
      )
  )
}
