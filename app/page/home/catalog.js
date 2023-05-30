import { O } from '@ppzp/utils.rc'
import { Link } from 'router-mini/react.js'
import { useCollapseSwitch } from '../../cmp/collapse_switch/index.js'

export default
function Catalog({ max, num }) {
  const pad_size = max.toString().length
  const collapse_switch = useCollapseSwitch()
  return O.nav(
    collapse_switch.el,
    O.div({ className: 'nav_wrapper' },
      Array.from({ length: max })
        .map(function(_, i) {
          const num = max - i
          return O.ul({ key: num },
            O.li(
              O(Link)({ to: '/?num=' + num },
                `第 ${num.toString().padStart(pad_size, '0')} 期`
              )
            )
          )
        })
    )
  )
}