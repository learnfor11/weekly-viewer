import { useState } from 'react'
import { O, useEffect2 } from '@ppzp/utils.rc'
import useAsyncGet from '@ppzp/utils.rc/use_async_get.js'
import { marked } from 'marked'

import useLatestNumValue from './state/latest_num.js'
import { useState_query_value } from './state/query.js'
import { get_by_num } from './api/raw.js'
import Loading from './cmp/loading.js'
import Header from './section/header.js'
import Catalog from './section/catalog.js'
import Anchors from './section/anchors.js'

export default function App() {
  const latest_num = useLatestNumValue()
  const num = useState_query_value().num || latest_num
  const [h1, set_h1] = useState()
  const [tokens, set_tokens] = useState()

  const [viewer, set_viewer] = useState()
  const raw_res = useAsyncGet({
    getter: () => get_by_num(num),
    load_on_mount: false
  })
  useEffect2([num], function start_load() {
    // 当 num 发生变化时，reload
    if(num) // 在 query 里没有 num，latest_num 还没加载完，此时不要 reload
      raw_res.reload()
  })

  useEffect2([raw_res.status], function render_viewer() {
    console.debug('render Viewer')
    set_viewer(raw_res.match({
      before_loaded() {
        console.debug('render Viewer before_loaded')
        return O.article({ className: 'loading' },
          O(Loading)('加载文章...')
        )
      },
      error(err) {
        console.debug('render Viewer error')
        return O.article(err)
      },
      loaded(data) {
        console.debug('render Viewer loaded')
        const tokens = marked.lexer(data)
        set_tokens(tokens)
        if(tokens[0].type === 'heading' && tokens[0].depth === 1) {
          set_h1(tokens[0].text)
          tokens.shift()
        }
        return O.article({
          dangerouslySetInnerHTML: { __html: marked.parser(tokens) }
        })
      }
    }))
  })

  return latest_num
    ? O._(
      O(Catalog)({ latest_num, num }),
      O.div({ className: 'main' },
        O(Header)({ h1 }),
        viewer,
        O(Anchors)({ _raw_tokens: tokens })
      )
    )
    : O(Loading)('加载最新期号...')
}
