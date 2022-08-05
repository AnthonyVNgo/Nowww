import React from 'react';
import NowwwEntryForm from '../components/now-entry-form';
import NowEntryLI from '../components/nowww-entry-list';
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
    this.deleteNowEntry = this.deleteNowEntry.bind(this);
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
          location: user.location,
          nowEntry: []
        });
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
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
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
      });
  }

  deleteNowEntry(EntryId) {
    const init = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    };

    fetch(`api/now-entry/${EntryId}`, init)
      .then(res => {})
      .then(finalResponse => {
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
      });
  }

  render() {
    if (!this.state.user) return null;
    const { handleChange } = this;
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
          <div className="row card">
            <form id='now-details-form' className='p-0' onSubmit={this.handleSubmit}>
              <div className="col-12 row m-0 p-0">
{/* profile picture section  */}
                <div className='profile-picture-container position-relative flex jc-center ai-center mb-3'>
                  <img src={profilePicture} className="card-img-top img-blur" />
                  <div className="profile-img-overlay"></div>
                  <div className='img-top-container'>
                    <button className='img-btn' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={profilePicture} className="img-top" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><input type="url" name='profilePicture' className='edit-input' onChange={handleChange} placeholder={profilePicture} /></li>
                    </ul>
                    <div className='pt-2'>
                      <h2 className='profile-username'>{username}</h2>
                    </div>
                  </div>
                </div>
{/* link section  */}
                <div className="col-xl-4 col-12 flex py-4 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                  </svg>
                  <input type="text" placeholder={link} name='link' className='edit-input' onChange={handleChange} maxLength="150" />
                </div>
{/* tagline section  */}
                <div className="col-xl-4 col-12 flex py-4 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  <input type="text" placeholder={location} name='location' className='edit-input' onChange={handleChange} maxLength="150" />
                </div>
{/* location section  */}
                <div className="col-xl-4 col-12 flex py-4 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                  <input type="text" placeholder={tagline} name='tagline' className='edit-input' onChange={handleChange} maxLength="150" />
                </div>
{/* horizontal line */}
                <hr className='mt-3'/>
{/* what & why content  */}
                <div className="col-12 py-4 px-5">
                  <h3>What do you do?</h3>
                  <input type="textarea" placeholder={whatContent} name='whatContent' className='edit-input-large' onChange={handleChange} maxLength="150" />
                </div>
                <div className="col-12 py-4 px-5">
                  <h3>Why?</h3>
                  <input type="textarea" placeholder={whyContent} name='whyContent' className='edit-input-large' onChange={handleChange} maxLength="150" />
                </div>
              </div>
            </form>
{/* now-entry-form's input  */}
            <div className='px-5'>
              <NowwwEntryForm onSubmit={this.addNowEntry} />
            {element}
            </div>
{/* now-details-form's save button */}
            <div className='jc-center flex mt-5 mb-5'>
              <button type="submit" form='now-details-form' className="btn btn-primary sign-up-btn w-fit-content">
                Save Changes
              </button>
            </div>
          </div>
    );
  }
}

UpdateMyNow.contextType = AppContext;
