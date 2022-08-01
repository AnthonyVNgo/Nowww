import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Nowww
          </a>
          <div>

            <button className="btn btn-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Nowww</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                {user !== null &&
                  <ul className='off-canvas-items'>
                    <li><a href="#my-now">My Nowww</a></li>
                    <li><a href="#edit">Edit Nowww</a></li>
                    <li><a href="#">Nowww Pages</a></li>
                    <li><a href="#" onClick={handleSignOut}>Sign-out</a></li>
                  </ul>
                }
                {user === null &&
                  <ul className='off-canvas-items'>
                    <li><a href="#">Nowww Pages</a></li>
                    <li><a href="#sign-up">Sign-up</a></li>
                    <li><a href="#sign-in">Login</a></li>
                  </ul>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
