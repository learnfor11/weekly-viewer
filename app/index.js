import { createElement as R, Fragment, useState } from 'react'
import { useMount } from '@ppzp/utils.rc'

import Loading from './cmp/loading.js'
import Catalog from './section/catalog.js'
import { NavSwitch } from './section/nav_switch.js'
import Header from './section/header.js'
import Article from './section/article.js'
import Menu from './section/menu.js'
import { init_state } from './state/init.js'
import { useCurrent } from './state/query.js'

export default function App() {
  useMount(init_state)
  const [nav_collapsed, setState_nav_collapsed] = useState(false)
  const current = useCurrent()
  return R('div',
    {
      className: 'viewer_root ' + (nav_collapsed ? 'nav_collaped':'nav_expanded')
    },
    current? // 判断：list 是否已加载
    R(Fragment, null,
      R(Catalog),
      R(NavSwitch, { setState_nav_collapsed }),
      R('div', { className: 'main' },
        R(Header),
        R(Article),
        R(Menu)
      )
    )
    : R(Loading, null, '加载期刊列表...')
  )
}