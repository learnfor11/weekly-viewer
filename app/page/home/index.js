import { O } from '@ppzp/utils.rc'

import Layout from '../../cmp/layout/index.js'
import Loading from '../../cmp/loading/index.js'

import useNumAndMax from './use_num_and_max.js'
import Catalog from './catalog.js'
import Viewer from './viewer.js'

export default
function HomePage() {
  const { ready, num, max } = useNumAndMax()
  return O(Layout)(
    O.main({ className: 'ppz-page-home' },
      ready
      ? O._(
          O(Catalog)({ max, num }),
          O(Viewer)({ num })
        )
      : O(Loading)(
          '加载最新期号...'
        )
    )
  )
}
