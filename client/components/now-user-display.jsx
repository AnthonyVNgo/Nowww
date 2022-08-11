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
          <LinkSVG />
          <span><a target="_blank" href={props.link} className="card-link" rel="noreferrer">{props.link}</a></span>
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
