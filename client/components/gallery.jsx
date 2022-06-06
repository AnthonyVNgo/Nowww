import React from 'react';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users });
      });
  }

  render() {
    return (
      <div className="container px-4">
        <div className="row gx-5">
          <p></p>
          {
            this.state.users.map(user => (
              <div key={user.userId} className="col-12 col-md-6 col-lg-4">
                <Card user={user}/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function Card(props) {
  // eslint-disable-next-line no-unused-vars
  const { userId, username, link, location, profilePicture, tagline } = props.user;
  /* this anchor should go to product details at `#products?productId=${productId}` */
  return (
    // <div class="card mb-4" style={{ width: `18rem` }}>
    <div className="card mb-4">
      <img src={profilePicture} className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
          </svg>
          <a href="#" className="card-link">{link}</a>
        </li>
        <li className="list-group-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          {location}
        </li>
        <li className="list-group-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
          <span>{tagline}</span>
        </li>
      </ul>
    </div>

  // <a
  //   // href={`#products?productId=${productId}`}
  //   // style={styles.users}
  //   className="text-dark card mb-4 shadow-sm text-decoration-none">
  //   {/* <img src={profilePicture} className="card-img-top" alt={name} style={styles.image} /> */}
  //   <img src={profilePicture} className="card-img-top"/>
  //   <div className="card-body">
  //     <h5 className="card-title">{username}</h5>
  //     <p className="card-text text-secondary">{link}</p>
  //     <p className="card-text">{location}</p>
  //   </div>
  // </a>
  );
}

// <div class="card" style={{ width: `18rem` }}>
//   <img src="https://www.gannett-cdn.com/-mm-/eb9153ef471ec1cb22faf645d7d063754d336115/c=0-330-2006-3000&r=2006x2670/local/-/media/USATODAY/test/2013/08/09/1376068652000-mmiin07p.jpg" alt="..." class="card-img-top"></img>
//   <div class="card-body">
//     <h5 class="card-title">{username}</h5>
//   </div>
//   <ul class="list-group list-group-flush">
//     <li class="list-group-item">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
//         <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
//         <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
//       </svg>
//       <a href="#" class="card-link">Another link</a>
//     </li>
//     <li class="list-group-item">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
//         <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
//       </svg>
//       Ye old barn
//     </li>
//     <li class="list-group-item">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
//         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
//         <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
//       </svg>
//       <span>Feelin' lucky, punk?</span>
//     </li>
//   </ul>
// </div>
