import { O } from '@ppzp/utils.rc'
import useAsyncGet from '@ppzp/utils.rc/use_async_get.js'
import { marked } from 'marked'

import { get_by_num } from '../../api/raw.js'

export default function Viewer({ num }) {
  // ppz's tip: 在外面处理 num 格式

  const raw_res = useAsyncGet({
    getter: () => get_by_num(num)
  })
  
  return raw_res.match({
    before_loaded: () => O.div('loading...'),
    error: err => O.div(err),
    loaded: data => O.div({
      dangerouslySetInnerHTML: { __html: marked.parse(data) }
    })
  })
}
