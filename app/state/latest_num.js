import create_external_state from 'state_mini'
import { get_latest_num } from '../api/raw.js'

const useLatestNum = create_external_state() // undefined: 未加载；null: 加载中；number: 加载成功
export default
function useLatestNumValue() {
  return useLatestNum().value
}
export
async function update_latest_num() {
  useLatestNum.set2(null) // 标记加载中
  try {
    useLatestNum.set2(await get_latest_num())
  } catch(err) {
    console.error('获取 latest num 失败')
    console.error(err)
    useLatestNum.set2(256)
  }
}
update_latest_num()
