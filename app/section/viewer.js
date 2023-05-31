import { O } from '@ppzp/utils.rc'
import useAsyncGet from '@ppzp/utils.rc/use_async_get.js'
import { marked } from 'marked'

import Loading from '../cmp/loading.js'
import { get_by_num } from '../api/raw.js'

export default
function Viewer({ num }) {
  console.debug('render Viewer')
  
  const raw_res = useAsyncGet({
    getter: () => get_by_num(num),
    watch: [num]
  })
  
  return raw_res.match({
    before_loaded() {
      return O.article(
        O(Loading)('加载文章...')
      )
    },
    error(err) {
      return O.article(err)
    },
    loaded(data) {
      // const lexer = marked.lexer(data)
      console.debug('render Viewer loaded') // 好多次！！
      return O.article({
        dangerouslySetInnerHTML: { __html: marked.parse(data, { mangle: false }) }
      })
    }
  })
}
