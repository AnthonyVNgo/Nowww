import React from 'react';

export default function Header(props) {
  return (
    <header className='mb-5 sticky-top'>
      <nav className="navbar navbar-dark bg-dark flex">
        <div className='container'>
          <div>
            <a href="#" className="navbar-brand">
              Nowww
            </a>
          </div>
          <div>
            <div className="dropdown">
              <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">My Nowww</a></li>
                <li><a className="dropdown-item" href="#">Nowww Pages</a></li>
                <li><a className="dropdown-item" href="#sign-up">Sign-up</a></li>
                <li><a className="dropdown-item" href="#login">Login</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
