import { createElement as R } from 'react'

export
function NavSwitch({ setState_nav_collapsed }) {
  return R('div', {
    className: 'nav_switch',
    onClick() {
      setState_nav_collapsed(value => !value)
    }
  })
}
