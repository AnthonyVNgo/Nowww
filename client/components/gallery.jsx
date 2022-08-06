import React from 'react';
import Loading from './loading';
import { LocationSVG, InfoSVG } from './svg-icons';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users });
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading === true) return <Loading />;

    return (
        <div className="row gx-5 pt-2">
          {
            this.state.users.map(user => (
              <div key={user.userId} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <Card user={user}/>
              </div>
            ))
          }
        </div>
    );
  }
}

function Card(props) {
  const { userId, username, location, profilePicture, tagline } = props.user;
  return (
  <a
    href={`#users?userId=${userId}`}
    className="card shadow-sm mb-4">
    <img src={profilePicture} className='card-img'/>
    <div className='card-img-overlay'>
      <div className="card-details">
        <h6>{username}</h6>
        <div>
          <div className='card-details-item'>
            <LocationSVG />
            <span className='text-truncate'>{location}</span>
          </div>
          <div className='card-details-item'>
            <InfoSVG />
            <span className='text-truncate'>{tagline}</span>
          </div>
        </div>
      </div>
    </div>
  </a>
  );
}
