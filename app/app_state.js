import { createContext, useContext } from 'react'
import { parse_positive_int } from './utils.js'

export
/** 最新期号 */
const MaxNum = createContext()

export
function useMaxNum() {
  const max_num_res = useContext(MaxNum)
  return {
    match(matcher) {
      return max_num_res.match({
        before_loaded: matcher.before_loaded,
        loaded(raw_max) {
          const max = parse_positive_int(raw_max)
          if(max)
            return matcher.loaded(max)
          else {
            console.error('最新期号格式错误', { raw_max })
            matcher.loaded(256)
          }
        },
        // 统一处理“获取最新期号失败”：使用今天的最新期号
        error(error) {
          console.error('获取最新期号失败', { error })
          console.warn('正在使用今天（2023-05-27）的最新期号', 256)
          return matcher.loaded(256)
        }
      })
    },
    reload: max_num_res.reload
  }
}
