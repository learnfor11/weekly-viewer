import { O, cns } from '@ppzp/utils.rc'
import { Link } from 'router-mini/react.js'
import { useCollapseSwitch } from '../../cmp/collapse_switch/index.js'

export default
function Catalog({ max, num }) {
  const pad_size = max.toString().length
  const collapse_switch = useCollapseSwitch({
    className: 'collapse_nav'
  })
  return O.nav({ className: cns({ collapse: collapse_switch.collapse }) },
    O.div({ className: 'left_top' },
      O.h1('科技爱好者周刊'),
      collapse_switch.el,
    ),
    O.ul({ className: 'nav_wrapper' },
      Array.from({ length: max })
        .map(function(_, i) {
          const num = max - i
          return O.li({ key: num },
            O(Link)({ to: '/?num=' + num },
              `第 ${num.toString().padStart(pad_size, '0')} 期`
            )
          )
        })
    )
  )
}