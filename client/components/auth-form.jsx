import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
          // console.log(result.user)
          // console.log(result.token)
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const welcomeMessage = action === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
    const altAction = action === 'sign-in'
      ? 'Not on Nowww?'
      : 'Already a user?';
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
      <form className="w-100 p-5" onSubmit={handleSubmit}>
        <header className="text-center">
          <h2 className="mb-2">
            Nowww
          </h2>
          <p className="text-muted">{welcomeMessage}</p>
        </header>
        <div>
          <label htmlFor="username" className="form-label">
          </label>
          <input
            placeholder='Username'
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            className="form-control bg-light" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
          </label>
          <input
            placeholder='Password'
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control bg-light" />
        </div>
          <button type="submit" className="btn btn-primary sign-up-btn">
            {submitButtonText}
          </button>
        <div className='row jc-center'>
          <p className='text-align-center my-2'>{altAction}</p>
          <a className="text-deco-none text-align-center" href={alternateActionHref}>
              {alternatActionText}
            </a>
          </div>
      </form>
    );
  }
}
