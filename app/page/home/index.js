import { useState } from 'react'
import { $ } from '@ppzp/utils.rc'
import Viewer from './viewer.js'

export default
function HomePage() {
  const [num] = useState(function get_num_from_href() {
    const params = new URLSearchParams(location.search)
    const num = params.get('num')
    if(!num)
      throw Error('Missing num in query string')
    return num
  })
  
  return num && $(Viewer, { num })
}
