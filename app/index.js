import { $ } from '@ppzp/utils.rc'
import { Router } from 'router-mini/react.js'

import HomePage from './page/home/index.js'

export default
function App() {
  return $(Router, {
    routes: [
      { path: '/', element: $(HomePage) }
    ]
  })
}
