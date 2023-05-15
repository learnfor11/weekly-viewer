import { $ } from '@ppzp/utils.rc'
import { marked } from 'marked'

import { get_by_num } from '../../api/raw.js'
import useAsyncGet from '../../common/use_async_get.js'

export default function Viewer({ num }) {
  // ppz's tip: 在外面处理 num 格式

  const raw_res = useAsyncGet({
    getter: () => get_by_num(num)
  })
  
  return raw_res.match({
    before_loaded: () => $.div('loading...'),
    error: err => $.div(err),
    loaded: data =>
      $.div({
        dangerouslySetInnerHTML: { __html: marked.parse(data) }
      })
  })
}
