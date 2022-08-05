import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import NowEntryLI from '../components/nowww-entry-list';
import NowUserDisplay from '../components/now-user-display';
import Loading from '../components/loading';

export default class MyNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowEntry: [],
      isLoading: false
    };
    this.getMyNow = this.getMyNow.bind(this);
  }

  getMyNow() {
    this.setState({ isLoading: true });
    fetch('/api/my-now/', {
      method: 'GET',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(res => res.json())
      .then(user => {
        this.setState({ user });
      });

    fetch('api/my-now-entries', {
      method: 'GET',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(fetchResponse => fetchResponse.json())
      .then(jsonResponse => {
        this.setState({ nowEntry: jsonResponse });
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.getMyNow();
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    if (!this.state.user) return null;
    if (this.state.isLoading === true) return <Loading />;

    const {
      username, profilePicture, tagline, whatContent, whyContent, link, location
    } = this.state.user;

    let element;
    if (this.state.nowEntry === undefined) {
      element = null;
    }

    if (this.state.nowEntry !== undefined) {
      element = (
        <ul className="list-group now-ul">
          {
            this.state.nowEntry.map((nowEntry, index) => {
              return (
                <NowEntryLI key={index} nowEntry={nowEntry} route={this.context.route} handleClick={this.deleteNowEntry} />
              );
            })
          }
        </ul>
      );
    }

    return (
      <NowUserDisplay
      profilePicture={profilePicture}
      username={username}
      link={link}
      location={location}
      tagline={tagline}
      whatContent={whatContent}
      whyContent={whyContent}
      element={element}
      />
    );
  }
}

MyNow.contextType = AppContext;
