import { useMemo } from 'react'
import { O } from '@ppzp/utils.rc'

export default
function Anchors({ _raw_tokens }) {
  const list = useMemo(function make_archors_list() {
    return _raw_tokens
      ?.filter(token => token.type === 'heading' && token.depth === 2)
      .map(token => token.text)
  }, [_raw_tokens])
  
  return O.menu(
    O.ul(
      list?.map(a => O.li(
        O.a({
          href: '#' + a.replaceAll(' ', '-').toLowerCase()
        }, a)
      ))
    )
  )
}
