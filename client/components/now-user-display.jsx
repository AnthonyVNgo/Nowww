import React from 'react';
import { LinkSVG, LocationSVG, InfoSVG } from './svg-icons';

export default function nowUserDisplay(props) {
  return (
    <div className="row card">
      <div className="col-12 row m-0 p-0">
{/* profile picture section  */}
        <div className='profile-picture-container position-relative d-flex justify-content-center align-items-center mb-3'>
          <img src={props.profilePicture} className="card-img-top img-blur" />
          <div className="profile-img-overlay"></div>
            <div className='img-top-container'>
            <div className='d-flex justify-content-center'>
              <img src={props.profilePicture} className="img-top" />
            </div>
            <div className='pt-2'>
              <h2 className='profile-username'>{props.username}</h2>
            </div>
          </div>
        </div>
{/* link section  */}
        <div className="col-xl-4 col-12 d-flex py-4 px-5">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
          </svg> */}
          <LinkSVG />
          <span><a href={props.link} className="card-link">{props.link}</a></span>
        </div>
{/* tagline section  */}
        <div className="col-xl-4 col-12 d-flex py-4 px-5">
          <InfoSVG />
          <span>{props.tagline}</span>
        </div>
{/* location section  */}
        <div className="col-xl-4 col-12 d-flex py-4 px-5">
          <LocationSVG />
          <span>{props.location}</span>
        </div>
{/* horizontal line */}
        <hr className='mt-3'/>
{/* what & why content  */}
        <div className="col-12 py-4 px-5">
          <h3>What do you do?</h3>
          <p>{props.whatContent}</p>
        </div>
        <div className="col-12 py-4 px-5">
          <h3>Why?</h3>
          <p>{props.whyContent}</p>
        </div>
{/* now entries  */}
        <div className="col-12 pb-5 px-5">
          {props.element}
        </div>
      </div>
    </div>
  );
}
