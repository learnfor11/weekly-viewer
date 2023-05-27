import { O } from '@ppzp/utils.rc'
import useAsyncGet from '@ppzp/utils.rc/use_async_get.js'
import { marked } from 'marked'

import Loading from '../../cmp/loading/index.js'
import { get_by_num } from '../../api/raw.js'

export default function Viewer({ num }) {
  // ppz's tip: 在外面处理 num 格式

  const raw_res = useAsyncGet({
    getter: () => get_by_num(num)
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
      return O.article({
        dangerouslySetInnerHTML: { __html: marked.parse(data) }
      })
    }
  })
}
