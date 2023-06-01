import create_external_state from 'state_mini'

const useState_query_ = create_external_state(function get_init() {
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

function update_query(query) {
  let result = '?'
  for(let key in query)
    if(query[key])
      result += `${key}=${query[key]}&`
  history.replaceState(null, null, result.slice(0, -1))
}

export default
function useState_query() {
  const state_query = useState_query_()
  return {
    value: state_query.value,
    set(make_new_value) {
      state_query.set(old_value => {
        const new_value = make_new_value(old_value)
        update_query(new_value)
        return new_value
      })
    }
  }
}
