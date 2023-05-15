import { $ } from '@ppzp/utils.rc'
import { Router } from 'router-mini/react.js'

import HomePage from './home/index.js'

const base_path = '/weekly_viewer'
const routes = [
  { path: base_path + '/', element: $(HomePage) },
]

export default
function AppRouter() {
  return $(Router, { routes })
}
