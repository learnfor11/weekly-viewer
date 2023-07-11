import { useMemo, createElement as R } from 'react'
import { Drawer, useExpand } from 'drawer.rc'
import { Link } from '../state/query.js'
import { useState_list } from '../state/list.js'
import { useCurrent } from '../state/query.js'

export default
function Catalog() {
  console.debug('rendering nav')

  const list = useState_list().value
  const current_article = useCurrent()

  // 期号最长长度
  const pad_size = useMemo(
    () => list.slice(-1)[0].number.toString().length,
    [list]
  )
  // 按年月分组的 list
  const list2 = useMemo(group_list(list), [list])

  return R('nav', null,
    R('ul', { className: 'nav_wrapper' },
      list2.map(item =>
        YearGroup({
          item, current_article, pad_size
        })
      )
    )
  )
}

// 一年的分组
function YearGroup({ item, current_article, pad_size }) {
  const expand = useExpand(false)
  return R('li', { key: item.label },
    R('label', { onClick: expand.toggle }, item.label),
    R(Drawer,
      {
        y: true,
        expand: expand.expand
      },
      R('ul', null,
        item.list.map(item =>
          MonthGroup({
            item, current_article, pad_size
          })
        )
      )
    )
  )
}

// 一月的分组
function MonthGroup({ item, current_article, pad_size }) {
  const expand = useExpand(false)
  return R('li', { key: item.label },
    R('label', { onClick: expand.toggle }, item.label),
    R(Drawer,
      {
        y: true,
        expand: expand.expand
      },
      R('ul', null,
        item.list.map(item => {
          // 渲染某一期
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
  )
}

const group_list = list => () => {
  const result = []
  for(let item of list) {
    const year = item.date.getFullYear()
    const month = item.date.getMonth() + 1
    
    const last_year = result[result.length - 1]
    const current_year = last_year?.label == year ? last_year : p_r(result, {
      label: year,
      amount: 0, // 统计篇数
      list: []
    })
    current_year.amount++

    const last_month = current_year.list.slice(-1)[0]
    const current_month = last_month?.label == month ? last_month : p_r(current_year.list, {
      label: month,
      list: []
    })
    current_month.list.push(item)
  }

  console.debug('got list2', result)
  return result

  function p_r(arr, el) { // push and return
    arr.push(el)
    return el
  }
}
