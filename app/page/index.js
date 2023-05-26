import { O } from '@ppzp/utils.rc'
import { Router, RouterConfig } from 'router-mini/react.js'

import HomePage from './home/index.js'

RouterConfig.base_path = '/weekly_viewer'
const routes = [
  { path: '/', element: O(HomePage)() },
]

export default
function AppRouter() {
  return O(Router)({ routes })
}
