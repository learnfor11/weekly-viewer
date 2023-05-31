import { O } from '@ppzp/utils.rc'
import { useLatestNumState } from './state/latest_num.js'

import Loading from './cmp/loading.js'
import Catalog from './section/catalog.js'
import Viewer from './section/viewer.js'

export default function App() {
  const latest_num = useLatestNumState()
  const num = latest_num
  const props = { latest_num, num }
  return latest_num
    ? O._(
      O(Catalog)(props),
      O(Viewer)(props)
    )
    : O(Loading)('加载最新期号...')
}
