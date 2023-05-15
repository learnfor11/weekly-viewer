export default function http_get(url) {
  return fetch(url).then(res => res.text())
}
