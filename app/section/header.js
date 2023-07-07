import { createElement as R } from 'react'
import { useCurrent } from '../state/query.js'

function format_date(date) {
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
}

export default
function Header() {
  const current = useCurrent()
  return R('header', null,
    R('h1', null, `第 ${current.number} 期 ${current.title}`), // 报错要趁早：此处 current.title 应直接用，如果 current 不存在，此组件不应被实例化
    R('div', { className: 'publish_date' }, format_date(current.date)),
    R('div', { className: 'links' },
      R('a',
        {
          href: 'https://github.com/learnfor11/weekly_viewer',
          target: '_blank'
        },
        '本站源码'
      ),
      R('a',
        {
          href: 'http://www.ruanyifeng.com/blog/',
          target: '_blank'
        },
        '阮一峰的网络日志'
      )
    )
  )
}
