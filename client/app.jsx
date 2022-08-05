import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import UserDetails from './pages/user-details';
import MyNow from './pages/my-now';
import UpdateMyNow from './pages/update-my-now';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      user: null,
      userDetails: null,
      nowEntry: [],
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    const { route } = this.state;
    const userId = this.state.user;

    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'users') {
      const userId = route.params.get('userId');
      return <UserDetails userId={userId} path={path}/>;
    }
    if (path === 'my-now') {
      return <MyNow user={userId}/>;
    }
    if (path === 'edit') {
      return <UpdateMyNow user={userId}/>;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;

    const { user, userDetails, route, nowEntry } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, userDetails, route, nowEntry, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          <PageContainer>
            {this.renderPage()}
          </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
