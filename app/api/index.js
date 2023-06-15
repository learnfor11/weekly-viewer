export default new Proxy(
  url => fetch(url),
  {
    get: (http_get, type) => url =>
      http_get(url)
      .then(res => res[type]())
  }
)

// coffeescript
// export default new Proxy(
//   (url) -> fetch url
//   get: (http_get, type) -> (url) ->
//     http_get url
//     .then (res) -> res[type]()
// )
