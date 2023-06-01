import { O, cns } from '@ppzp/utils.rc'
import { useCollapseSwitch } from '../cmp/collapse_switch.js'
import { Link } from '../state/query.js'

export default
function Catalog({ latest_num, num }) {
  const pad_size = latest_num.toString().length
  const collapse_switch = useCollapseSwitch({
    className: 'collapse_nav'
  })
  return O.nav({ className: cns({ collapse: collapse_switch.collapse }) },
    O.div({ className: 'left_top' },
      O.label('科技爱好者周刊'),
      collapse_switch.el,
    ),
    O.ul({ className: 'nav_wrapper' },
      Array.from({ length: latest_num })
        .map(function(_, i) {
          const num = latest_num - i
          return O.li({ key: num },
            O(Link)(
              {
                to: { num }
              },
              `第 ${num.toString().padStart(pad_size, '0')} 期`  
            )
          )
        })
    )
  )
}