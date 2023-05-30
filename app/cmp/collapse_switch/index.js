import { useState } from 'react'
import { O, cns } from '@ppzp/utils.rc'

export
function CollapseSwitch({ collapse, set_collapse, className }) {
  return O.label({ className: cns('ppz_cmp_collapse_switch', className) },
    O.div(),
    O.input({
      type: 'checkbox',
      checked: collapse,
      onChange() {
        set_collapse(!collapse)
      }
    })
  )
}

export
function useCollapseSwitch({
  default_collapse = false,
  className
}) {
  const [collapse, set_collapse] = useState(default_collapse)
  return {
    collapse,
    set_collapse,
    el: O(CollapseSwitch)({
      className,
      collapse,
      set_collapse
    })
  }
}
