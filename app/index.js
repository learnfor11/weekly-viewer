import { O } from '@ppzp/utils.rc'
import useAsyncGet from '@ppzp/utils.rc/use_async_get.js'

import Pages from './page/index.js'
import { MaxNum } from './app_state.js'
import { get_max } from './api/raw.js'

export default function App() {
  return O(MaxNumContextProvider)(
    O(Pages)()
  )
}

function MaxNumContextProvider({ children }) {
  const max_res = useAsyncGet({
    getter: get_max
  })
  return O(MaxNum.Provider)(
    {
      value: max_res
    },
    children
  )
}
