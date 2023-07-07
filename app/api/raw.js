import http_get from './index.js'

export
async function get_list() {
  const data = await http_get.json('https://raw.githubusercontent.com/learnfor11/weekly_provider/main/db.json')
  data.list.forEach(item => item.date = new Date(item.date))
  return data.list
}

export
function get_by_num(num) {
  console.debug('getting article by num', num)
  return http_get.text(`https://raw.githubusercontent.com/ruanyf/weekly/master/docs/issue-${num}.md`)
}
