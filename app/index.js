import { createElement as R, Fragment } from 'react'
import { useMount } from '@ppzp/utils.rc'

import Loading from './cmp/loading.js'
import Header from './section/header.js'
import Catalog from './section/catalog.js'
import Menu from './section/menu.js'
import Article from './section/article.js'
import { init_state } from './state/init.js'
import { useCurrent } from './state/query.js'

export default function App() {
  useMount(init_state)
  const current = useCurrent()
  return current? // 判断：list 是否已加载
    R(Fragment, null,
      R(Catalog),
      R('div', { className: 'main' },
        R(Header),
        R(Article),
        R(Menu)
      )
    )
    : R(Loading, null, '加载期刊列表...')
}