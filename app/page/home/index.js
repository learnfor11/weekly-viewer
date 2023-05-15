import { $ } from '@ppzp/utils.rc'

import { get_by_num } from '../../api/raw.js'
import useAsyncGet from '../../common/use_async_get.js'

export default
function HomePage() {
  const raw_res = useAsyncGet({
    getter() {
      const params = new URLSearchParams(location.search)
      const num = params.get('num')
      if(!num)
        throw Error('Missing num in query string')
      return get_by_num(num)
    }
  })
  
  return raw_res.match({
    before_loaded: () => $.div('loading...'),
    loaded: data =>
      $.div(data)
    ,
    error: err =>
      $.div(err)
  })
}
