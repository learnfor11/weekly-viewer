import { useMemo } from 'react'
import { O } from '@ppzp/utils.rc'

export default
function Menu({ _raw_tokens }) {
  const list = useMemo(function make_archors_list() {
    return _raw_tokens
      ?.filter(token => token.type === 'heading' && token.depth === 2)
      .map(token => token.text)
  }, [_raw_tokens])
  
  return  O.menu(
    list?.map(title => O.li(
      { key: title },
      
      O.a(
        {
          href: '#' + title.replaceAll(' ', '-').toLowerCase()
        },
        title
      )
    ))
  )
}
