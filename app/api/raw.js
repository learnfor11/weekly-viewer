import get from './index.js'

export function get_max() { // 最后一期的期号
  return new Promise(res =>
    setTimeout(
      () => res(256),
      666
    )
  )
}

export function get_by_num(num) {
  return get(`https://raw.githubusercontent.com/ruanyf/weekly/master/docs/issue-${num}.md`)
}
