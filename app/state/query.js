import { O } from '@ppzp/utils.rc'
import create_external_state from 'state_mini'

const useState_query = create_external_state(function get_init() {
  // 原始 query
  const query = new URLSearchParams(location.search)
  // 是否需要格式化 query
  let rewrite_query = false
  
  // 当前期号
  let num = parseInt(query.get('num'))
  if(!Number.isInteger(num)) {
    num = null
    rewrite_query = true
  }
  
  // 是否折叠导航栏
  let collapse_nav = {
    yes: true,
    no: false
  }[query.get('collapse_nav')]
  if(typeof collapse_nav != 'boolean') {
    collapse_nav = false
    rewrite_query = true
  }
  
  // 格式化后的 query
  const formatted_query = { num, collapse_nav }
  
  if(rewrite_query)
    update_query(formatted_query)
  return formatted_query
}())

function get_href(query) {
  let result = '?'
  for(let key in query)
    if(query[key])
      result += `${key}=${query[key]}&`
  return result
}

function update_query(query) {
  history.replaceState(null, null, get_href(query).slice(0, -1))
}

export
function useState_query_value() {
  return useState_query().value
}

export
function Link({ to, className, children }) {
  const current_query = useState_query_value()
  const target_query = Object.assign({}, current_query, to)
  return O.a(
    {
      className,
      href: get_href(target_query),
      onClick(evt) {
        update_query(target_query)
        useState_query.set2(target_query)
        evt.preventDefault()
      }
    },
    children
  )
}