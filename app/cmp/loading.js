import { createElement as R } from 'react'

export default
function Loading({ children }) {
  return R('div', { className: 'ppz_cmp_loading' },
    R('div', { className: 'content' },
      R('div', { className: 'spin-target' }),
      R('div', { className: 'title' }, children)
    )
  )
}
