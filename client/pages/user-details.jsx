import React from 'react';
import AppContext from '../lib/app-context';
import NowEntryLI from '../components/nowww-entry-list';
import NowUserDisplay from '../components/now-user-display';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      nowEntry: []
    };
  }

  componentDidMount() {
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));

    fetch(`/api/users/now-entries/${this.props.userId}`)
      .then(fetchResponse => fetchResponse.json())
      .then(jsonResponse => {
        this.setState({ nowEntry: jsonResponse });
      });
  }

  render() {
    if (!this.state.user) return null;
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

UserDetails.contextType = AppContext;
