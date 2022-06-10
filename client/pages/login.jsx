import React from 'react';

export default function Login(props) {
  return (
    <div className='row jc-center ai-center vh100 m-0'>
      <form className='col-8 col-sm-7 col-m-6 col-lg-5 col-xl-4 col-xxl-3'>
        <div className="mb-3">
          <h1 className='logo'>Nowww</h1>
          <label htmlFor='username' className='form-label' ></label>
          <input type="text" className="form-control" id='username' placeholder="Username" />
          <label htmlFor="" className="form-label"></label>
          <input type="password" className="form-control" id="" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary sign-up-btn">Login</button>
        <div className='row jc-center'>
          <p className='text-align-center my-2'>Not on Nowww?</p>
          <a href="#sign-up" className='text-deco-none text-align-center'>Register</a>
        </div>
      </form>
    </div>
  );
}
