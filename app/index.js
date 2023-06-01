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

export default function App() {
  const latest_num = useLatestNumValue()
  const num = useState_query_value().num || latest_num
  const [h1, set_h1] = useState()

  const [viewer, set_viewer] = useState()
  const raw_res = useAsyncGet({
    getter: () => get_by_num(num),
    watch: [num]
  })
  useEffect2([raw_res.status], function render_viewer() {
    console.debug('render Viewer')
    set_viewer(raw_res.match({
      before_loaded() {
        console.debug('render Viewer before_loaded')
        return O.article(
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
        viewer
      )
    )
    : O(Loading)('加载最新期号...')
}
