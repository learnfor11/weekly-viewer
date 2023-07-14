import { createElement as R } from 'react'
import create_external_state from 'state_mini'
import { get_latest_num, useState_list } from './list.js'

export
const useState_num = create_external_state()

export
function get_current_num() {
  return useState_num.get() || get_latest_num()
}
// export const get_current_num = () => useState_num.get() || get_latest_num()
// export get_current_num = -> useState_num.get() || get_latest_num()

export
function useCurrent() {
  const list = useState_list().value
  let num = useState_num().value
  if(num !== undefined) {
    const index = num === null ? 0 : list.length - num
    return list[index]
  }
}

export
function rewrite_query() {
  const num = useState_num.get()
  console.debug('rewriting query', { num })
  // history.replaceState 会更新地址栏，但页面不会重新加载
  history.replaceState(null, '', get_href(num))
}

export
function Link({ to, children, ...props }) {
  const href = get_href(to)
  return R('a',
    {
      ...props,
      href, // 保证 href 的原始功能（比如“右键、在新的标签页打开”）
      onClick(evt) {
        useState_num.set2(to)
        rewrite_query() // 更新地址栏
        evt.preventDefault() // 阻止页面刷新
      }
    },
    children
  )
}

function get_href(to) {
  let href = location.pathname
  if(to)
    href += '?num=' + to
  return href
}