import { get_list, get_by_num } from '../api/raw.js'
import { useState_list, get_latest_num } from './list.js'
import { useState_num, rewrite_query, get_current_num } from './query.js'
import { useState_article } from './article.js'

export
async function init_state() {
  await init_list()
  init_query()
  init_article()
  async function init_list() {
    const list = await get_list() // 获取往期列表（第几期、标题、发布时间）
    useState_list.set2(list) // 更新状态：往期列表
  }

  async function init_query() {
    const query = new URLSearchParams(location.search)
    let rewrite = false
    useState_num.set(function parse_num_in_query() {
      const raw_num = query.get('num')
      if(raw_num === null)
        return null
      const num = Number(raw_num)
      if(Number.isInteger(num) && 0 < num && num <= get_latest_num())
        return num
      else {
        console.debug('query_num 格式不正确')
        rewrite = true
        return null
      }
    })
    if(rewrite)
      rewrite_query()
  }

  function init_article() {
    load_article()
    useState_num.subscribe(load_article)
    async function load_article() {
      const num = get_current_num()
      console.debug('loading article, current num', num)
      useState_article.set2(await get_by_num(num))
    }
  }
}