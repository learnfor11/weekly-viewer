/**
 * 判断是否为正整数
 * @return false 或 解析出的正整数
 */
export
function parse_positive_int(target) {
  const parsed = parseInt(target)
  return target == parsed && target > 0 && target
}