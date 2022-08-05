import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import NowEntryLI from '../components/nowww-entry-list';
import NowUserDisplay from '../components/now-user-display';

export default class MyNow extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    if (!this.context.user) return null;

    const {
      username, profilePicture, tagline, whatContent, whyContent, link, location
    } = this.context.userDetails;

    let element;
    if (this.context.nowEntry === undefined) {
      element = null;
    }

    if (this.context.nowEntry !== undefined) {
      element = (
        <ul className="list-group now-ul">
          {
            this.context.nowEntry.map((nowEntry, index) => {
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
