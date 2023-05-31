import get from './index.js'

export
function get_latest_num() { // 最后一期的期号，保证“只要 return，得到的就一定是正确格式的 num”（在此处处理异常）
  return new Promise(res =>
    setTimeout(
      () => res(256),
      666
    )
  )
}

export
function get_by_num(num) {
  return get(`https://raw.githubusercontent.com/ruanyf/weekly/master/docs/issue-${num}.md`)
}
