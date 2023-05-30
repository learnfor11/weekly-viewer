import { useState } from 'react'
import { O } from '@ppzp/utils.rc'

export
function CollapseSwitch({ collapse, set_collapse }) {
  return O.div({ className: 'collapse_switch' },
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
function useCollapseSwitch(default_collapse = false) {
  const [collapse, set_collapse] = useState(default_collapse)
  return {
    collapse,
    set_collapse,
    el: O(CollapseSwitch)({
      collapse,
      set_collapse
    })
  }
}
