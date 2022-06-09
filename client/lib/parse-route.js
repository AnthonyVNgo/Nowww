export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, queryString] = hashRoute.split('?');
  // console.log(path)
  // console.log(queryString)
  // console.log(hashRoute)
  const params = new URLSearchParams(queryString);
  return { path, params };
}
