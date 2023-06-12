import { O } from '@ppzp/utils.rc'

export default
function Header({ h1 }) {
  return O.header(
    O.h1(h1),

    O.div({ className: 'links' },
      O.a({
        href: 'https://github.com/learnfor11/weekly_viewer',
        target: '_blank'
      }, '本站源码'),
      O.a({
        href: 'http://www.ruanyifeng.com/blog/',
        target: '_blank'
      }, '阮一峰的网络日志')
    )
  )
}
