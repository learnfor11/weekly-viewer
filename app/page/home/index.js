import { $ } from '@ppzp/utils.rc'
import { useQuery } from 'router-mini/react.js'

import Catalog from './catalog.js'
import Viewer from './viewer.js'

export default
function HomePage() {
  const num = useQuery()?.num
  return num ? $(Viewer, { num }) : $(Catalog)
}
