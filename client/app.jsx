import React from 'react';
import Home from './pages/home';
import NotFound from './pages/not-found';
import UserDetails from './pages/user-details';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'users') {
      const userId = route.params.get('userId');
      return <UserDetails userId={userId} />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        {this.renderPage()}
      </>
    );
  }
}
