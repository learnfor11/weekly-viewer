import { useMemo, createElement as R } from 'react'
import { Link } from '../state/query.js'
import { useState_list } from '../state/list.js'
import { useCurrent } from '../state/query.js'

export default
function Catalog() {
  const list = useState_list().value
  const current_article = useCurrent()
  const pad_size = useMemo(function parse_pad_size() {
    const latest = list.slice(-1)[0]
    return latest.number.toString().length
  }, [list])

  return R('nav', null,
    R('ul', { className: 'nav_wrapper' },
      list.map(function render_menu_item(item) {
        const padded_num = item.number.toString().padStart(pad_size, '0')
        return R('li', { key: item.number },
          R(Link,
            {
              disabled: item.number == current_article?.number,
              to: item.number,
              title: `第 ${padded_num} 期 ${item.title || '（第 106 期之前没标题）' }`,
            },
            R('span', { className: 'number' }, padded_num, '. '),
            item.title || R('span', { className: 'no_name' }, '无标题')
          )
        )
      })
    )
  )
}