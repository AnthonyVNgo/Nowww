import React from 'react';
import Loading from './loading';

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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span className='text-truncate'>{location}</span>
          </div>
          <div className='card-details-item'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <span className='text-truncate'>{tagline}</span>
          </div>
        </div>
      </div>
    </div>
  </a>
  );
}
