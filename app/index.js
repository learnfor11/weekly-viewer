import { O } from '@ppzp/utils.rc'
import useLatestNumState from './state/latest_num.js'
import useState_query from './state/query.js'

import Loading from './cmp/loading.js'
import Header from './section/header.js'
import Catalog from './section/catalog.js'
import Viewer from './section/viewer.js'

export default function App() {
  const latest_num = useLatestNumState()
  const num = useState_query().state.num || latest_num
  const props = { latest_num, num }
  return latest_num
    ? O._(
      O(Catalog)(props),
      O.div({ className: 'main' },
        O(Header)(),
        O(Viewer)(props)
      )
    )
    : O(Loading)('加载最新期号...')
}
