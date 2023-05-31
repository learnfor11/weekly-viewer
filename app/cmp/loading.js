import { O } from '@ppzp/utils.rc'

export default
function Loading({ children }) {
  return O.div({ className: 'ppz_cmp_loading' },
    O.div({ className: 'content' },
      O.div({ className: 'spin-target' }),
      O.div({ className: 'title' }, children)
    )
  )
}
