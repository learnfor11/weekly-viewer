import get from './_index.js'

export function get_max() { // 最后一期的期号
  return Promise.resolve(254)
}

export function get_by_num(num) {
  return get(`https://raw.githubusercontent.com/ruanyf/weekly/master/docs/issue-${num}.md`)
}