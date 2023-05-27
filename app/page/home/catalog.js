import { O } from '@ppzp/utils.rc'
import { Link } from 'router-mini/react.js'

export default
function Catalog({ max, num }) {
  const pad_size = max.toString().length
  return O.nav(
    Array.from({ length: max })
      .map(function(_, i) {
        const num = max - i
        return O.div({ key: num },
          O(Link)({ to: '/?num=' + num },
            `第 ${num.toString().padStart(pad_size, '0')} 期`
          )
        )
      })
  )
}