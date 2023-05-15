import { $ } from '@ppzp/utils.rc'
import ReactDOM from 'react-dom'
import { Router } from 'router-mini/react.js'

import HomePage from './page/home/index.js'

const mount_root = document.getElementById('app-root')
const react_app = ReactDOM.createRoot(mount_root)
react_app.render($(App))

function App() {
  return $(Router, {
    routes: [
      { path: '/', element: $(HomePage) }
    ]
  })
}
