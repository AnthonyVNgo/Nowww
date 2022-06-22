import React from 'react';
import NowwwEntryForm from '../components/now-entry-form';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class UpdateMyNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: '',
      tagline: '',
      whatContent: '',
      whyContent: '',
      link: '',
      location: '',
      nowEntry: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNowEntry = this.addNowEntry.bind(this);
  }

  componentDidMount() {
    if (!this.context.user) return;

    fetch('/api/my-now/', {
      method: 'GET',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(res => res.json())
      .then(user => {
        this.setState({
          user,
          profilePicture: user.profilePicture,
          tagline: user.tagline,
          whatContent: user.whatContent,
          whyContent: user.whyContent,
          link: user.link,
          location: user.location
        });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    // console.log(`update-my-now.jsx handleSubmit fired`)
    // event.preventDefault();
    const req = {
      method: 'PUT',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt'), 'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('api/edit', req)
      .then(res => {
      })
      .then(finalResponse => {
      });
  }

  addNowEntry(newNowEntry) {
    const init = {
      method: 'POST',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt'), 'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNowEntry)
    };

    const nowArr = this.state.nowEntry;

    fetch('api/now-entry', init)
      .then(fetchResponse => fetchResponse.json())
      .then(data => {
        const nowArrPlusNewNowEntry = nowArr.concat(data);
        this.setState({ nowEntry: nowArrPlusNewNowEntry });
        // console.log('fire in the browser console')
      });
  }

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    if (!this.state.user) return null;
    if (!this.state.user) return <Redirect to="sign-in" />;
    const { handleChange } = this;
    const {
      username, profilePicture, tagline, whatContent, whyContent, link, location
    } = this.state.user;
    return (
      <div className="container">
        <div className="row jc-center flex card shadow-sm p-3">
          <form onSubmit={this.handleSubmit}>
            <div className="col-12 col-md-12 col-lg-12 row m-0 p-0 position-relative">
                <div className="col-12 col-md-6">
                <div className="dropdown">
                    <button className='img-btn width-100' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={profilePicture} className="card-img-top" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><input type="url" name='profilePicture' className='edit-input' onChange={handleChange} placeholder={profilePicture} /></li>
                    </ul>
                </div>
             </div>
            <div className="col-12 col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h2 className="card-title">{username}</h2>
                </li>
                <li className="list-group-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                  </svg>
                    <input type="text" placeholder={link} name='link' className='edit-input' onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                    <input type="text" placeholder={location} name='location' className='edit-input' onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                    <input type="text" placeholder={tagline} name='tagline' className='edit-input' onChange={handleChange}/>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-12">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h3>What do you do?</h3>
                    <input type="textarea" placeholder={whatContent} name='whatContent' className='edit-input-large' onChange={handleChange}/>
                </li>
                <li className="list-group-item">
                  <h3>Why?</h3>
                    <input type="textarea" placeholder={whyContent} name='whyContent' className='edit-input-large' onChange={handleChange}/>
                </li>
              </ul>
              {/* <NowwwForm onChange={this.handleChange} onSubmit={this.addNowEntry}/> */}

            </div>
          </div>
          {/* <div className="row jc-center position-absolute top-0 right-0"> */}
          <div className="position-absolute top-0 right-0">
              {/* <button type="submit" className="btn btn-primary sign-up-btn w-fit-content mt-5"> */}
            <button type="submit" className="btn btn-primary sign-up-btn w-fit-content mt-3 me-3">
              save changes
            </button>
          </div>
        </form>
          <NowwwEntryForm onSubmit={this.addNowEntry} />
        </div>
      </div>
    );
  }
}

UpdateMyNow.contextType = AppContext;
