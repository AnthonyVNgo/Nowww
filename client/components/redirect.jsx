export default function Redirect(props) {
  const url = new URL(window.location);
  if (props.to === '') {
    url.hash = '#';
  } else {
    url.hash = props.to;
  }
  window.location.replace(url);
  return null;
}

// this component is used in:
// home.jsx
// auth.jsx

// auth.jsx
// line 11. if user returns true,
// then the Redirect component's to property/prop is assigned the value of ''

// Redirect.jsx
// line 3. if this component's to property/prop is === '',
// then # is assigned to the hash property of the url object,
// where the url object represents window.location

// if user returns true, then the Redirect compononent's to property/prop is assigned to an empty string ''
// which results in the window.location.hash to = #
// assigning the window.location.hash to # leads to app.jsx renderPage() method to return the <Home /> page/component
// app.jsx renderPage() returns <Home /> because path === ''
// path === '' because of what happens in parse-route.js

// parse-route.js
// line 1. the parseRoute function has 1 parameter / takes 1 argument (hashRoute)
// line 2. if hashRoute starts with #, then it is replaced with an empty string ''
// line 5. hashRoute is split with the separator '?'
// line 5. if there isn't a '?' in hashRoute, then the entire value of hashRoute is returned and assigned to the variable path
// line 7. parseRoute returns path
