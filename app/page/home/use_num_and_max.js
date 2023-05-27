import { useState } from 'react'
import { useEffect2 } from '@ppzp/utils.rc'
import { useQuery, useRoute } from 'router-mini/react.js'

import { parse_positive_int } from '../../utils.js'
import { useMaxNum } from '../../app_state.js'

function useResetRoute() {
  const $route = useRoute()
  return function reset_route() {
    debugger // 调试时可以把这行封印解除
    $route.set('/') // 更新地址栏
    location.reload()
  }
}

/** @returns {number} 地址栏里的期号 [undefined: 未加载; null: 不存在; number: 期号] */
function useNum() {
  const [num, set_num] = useState()
  const query = useQuery()
  const reset_route = useResetRoute()
  useEffect2([query], function parse_num() {
    if(query === null) {
      console.debug('query 不存在')
      set_num(null)
    } else {
      let num = parse_positive_int(query.num)
      if(num)
        set_num(num)
      else {
        console.error('num 格式异常，reload')
        reset_route()
      }
    }
  })
  
  return num
}

export default
function useNumAndMax() {
  const reset_route = useResetRoute()
  const num_mb_null = useNum()
  const max_num_res = useMaxNum()

  return max_num_res.match({
    before_loaded() {
      return { ready: false }
    },
    loaded(max) { // 这个 max 在 useMaxNum 里已经验证格式了，是正经 max
      let num = num_mb_null || max
      if(num > max) {
        console.error('num > max，reload')
        reset_route()
      }
      console.debug('loaded num and max', { num, max })
      return {
        ready: true,
        num,
        max
      }
    }
  })
}
