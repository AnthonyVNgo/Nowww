export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, queryString] = hashRoute.split('?');
  const params = new URLSearchParams(queryString);
  return { path, params };
}

// contextual information
// window.location.hash:
// The hash property of the Location interface returns
// a string containing a '#' followed by
// the fragment identifier of
// the URL — the ID on the page that the URL is trying to target.

// componentDidMount() {
//   window.addEventListener('hashchange', () => {
//     this.setState({
//       route: parseRoute(window.location.hash)
//     });
//   });
//   const token = window.localStorage.getItem('react-context-jwt');
//   const user = token ? jwtDecode(token) : null;
//   this.setState({ user, isAuthorizing: false });
// }

// line 19. if there's a hashchange event handler + its callback function
// line 20-21. if hashchange, then the component's state.route is updated to the return of parseRoute(window.location.hash)

// line 1. the function parseRoute has 1 parameter hashRoute
// line 2. there's a condition satement that checks if the argument starts with '#'
// line 3. if the argument starts with '#', then '#' in the argument is replaced with an empty string ''

// split():
// If separator is omitted or does not occur in str,
// then the returned array contains one element consisting of the entire string.

// line 5. the return of hashRoute.split('?') is destructured

// if the route contains '?',
// then the first element is assigned to path,
// the second element is assigned to queryString

// as of now, params is not relevant, may need to review later

// line 7. parseRoute returns path, which basically contains whatever came after #, minus the #

// parseRoute(#testRoute) // { path: testRoute }
// parseRoute(#test?Route) // { path: test, param: ??? }
