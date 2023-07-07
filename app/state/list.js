import create_external_state from 'state_mini'

export
const useState_list = create_external_state() // undefined: 未加载；null: 加载中；Array: 加载成功

export
function get_latest_num() { // 组件外用
  const list = useState_list.get()
  return list[0].number
}