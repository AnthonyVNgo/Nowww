import React from 'react';

export default function nowUserDisplay(props) {
  return (
    <div className="row jc-center flex card shadow-sm">
      <div className="col-12 row m-0 p-0 pb-4">
        <div className="col-12 p-0">
          <div className='profile-picture-container position-relative flex jc-center ai-center'>
                <img src={props.profilePicture} className="card-img-top img-top" />
            <img src={props.profilePicture} className="card-img-top img-blur" />
          </div>
        </div>

        <div className="col-12 bio-top">
          <ul className="list-group bio">

            <li className="list-group-item">
              <h2>{props.username}</h2>
            </li>

            <li className="list-group-item">
              <div className="flex">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                  </svg>
                </div>
                <div className='width-100 pe-4'>
                  <span><a href={props.link} className="card-link">{props.link}</a></span>
                </div>
              </div>
            </li>

            <li className="list-group-item">
              <div className='flex'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </div>
                <div className='width-100 pe-4'>
                  <span>{props.location}</span>
                </div>
              </div>
            </li>

            <li className="list-group-item">
              <div className="flex">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </div>
                <div className='width-100 pe-4'>
                  <span>{props.tagline}</span>
                </div>
              </div>
            </li>

          </ul>
        </div>

        <div className="col-12 col-md-12 my-3">
          <ul className="list-group content">

            <li className="list-group-item">
              <h3>What do you do?</h3>
              <p>{props.whatContent}</p>
            </li>

            <li className="list-group-item">
              <h3>Why?</h3>
              <p>{props.whyContent}</p>
            </li>

          </ul>
        </div>

        <div className="col-12 col-md-12">
          {props.element}
        </div>
      </div>

      {/* <div className='profile-picture-container'>
        <img src={props.profilePicture} className="card-img-top img-top position-absolute" />
        <img src={props.profilePicture} className="card-img-top img-blur position-absolute" />
      </div> */}

      {/* <div className="position-relative">
<img className='img-top position-absolute' src={props.profilePicture} alt="" />
          <img className='img-blur position-absolute' src={props.profilePicture} alt="" />
      </div> */}
      {/* <div><img src={props.profilePicture} alt="" />
        <div><img className='img-blur' src={props.profilePicture} alt="" /></div>
      </div> */}
    </div>
  );
}
