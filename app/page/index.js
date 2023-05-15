import { $ } from '@ppzp/utils.rc'
import { Router } from 'router-mini/react.js'

import HomePage from './home/index.js'

const routes = [
  { path: '/', element: $(HomePage) },
]

export default
function AppRouter() {
  return $(Router, { routes })
}
