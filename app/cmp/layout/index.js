import { O } from '@ppzp/utils.rc'

export default
function Layout({ children }) {
  return O.div({ className: 'layout-root' },
    children
  )
}
