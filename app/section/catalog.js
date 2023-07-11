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

  // 按年月分组的 list
  const list2 = useMemo(group_list(list), [list])

  return R('nav', null,
    R('ul', { className: 'nav_wrapper' },
      list2.map(item =>
        YearGroup({
          item, current_article
        })
      )
    )
  )
}

// 一年的分组
function YearGroup({ item, current_article }) {
  const expand = useExpand(false)
  return R('li', { key: item.label },
    R('div',
      {
        className: 'group_label',
        onClick: expand.toggle
      },
      item.label + ' 年',
      R('span', { className: 'number' },
        item.list.slice(-1)[0].list.slice(-1)[0].pad_num, // 最后一个月的，最后一期的，期号
        ' ~ ',
        item.list[0].list[0].pad_num // 第一个月的，第一期的，期号
      )
    ),
    R(Drawer,
      {
        y: true,
        expand: expand.expand
      },
      R('ul', { className: 'number' },
        item.list.map(item =>
          MonthGroup({
            item, current_article
          })
        )
      )
    )
  )
}

// 一月的分组
function MonthGroup({ item, current_article }) {
  const expand = useExpand(false)
  return R('li', { key: item.label },
    R('div',
      {
        className: 'group_label',
        onClick: expand.toggle
      },
      item.label.toString().padStart(2, '0') + ' 月',
      R('span', { className: 'number' },
        item.list.slice(-1)[0].pad_num,
        ' ~ ',
        item.list[0].pad_num
      )
    ),
    R(Drawer,
      {
        y: true,
        expand: expand.expand
      },
      R('ul', null,
        item.list.map(item => {
          // 渲染某一期
          return R('li', { key: item.number },
            R(Link,
              {
                disabled: item.number == current_article?.number,
                to: item.number,
                title: `第 ${item.pad_num} 期 ${item.title || '（第 106 期之前没标题）' }`,
              },
              R('span', { className: 'number' }, item.pad_num, '. '),
              item.title || R('span', { className: 'no_name' }, '无标题')
            )
          )
        })
      )
    )
  )
}

const group_list = list => () => {
  const pad_size = list[0].number.toString().length
  const result = []
  for(let item of list) {
    item.pad_num = item.number.toString().padStart(pad_size, '0')
    const year = item.date.getFullYear()
    const month = item.date.getMonth() + 1
    
    const last_year = result[result.length - 1]
    const current_year = last_year?.label == year ? last_year : p_r(result, {
      label: year,
      list: []
    })

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
