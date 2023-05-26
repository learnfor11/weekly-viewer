import { O } from '@ppzp/utils.rc'
import { Link } from 'router-mini/react.js'

export default
function Catalog() {
  const max = 254 // 254 是最新一期的期号，先写死，后面用 github action 搞
  const pad_size = max.toString().length
  return O.div({ className: 'home-catalog' },
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