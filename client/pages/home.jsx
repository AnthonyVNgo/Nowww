import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import Gallery from '../components/gallery';

export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;
    return (
      <div>
        <Gallery />
      </div>
    );
  }
}
Home.contextType = AppContext;
