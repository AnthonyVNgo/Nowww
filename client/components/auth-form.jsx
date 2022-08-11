import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Anthony Ngo',
      password: 'pw'
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
    const usernameInputValue = action === 'sign-in'
      ? 'Anthony Ngo'
      : '';
    const passwordInputValue = action === 'sign-in'
      ? 'pw'
      : '';
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
            value={usernameInputValue}
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
            value={passwordInputValue}
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control bg-light" />
        </div>
          <button type="submit" className="btn btn-primary sign-up-btn w-100">
            {submitButtonText}
          </button>
        <div className='row justify-content-center'>
          <p className='text-center my-2'>{altAction}</p>
          <a className="text-decoration-none text-center" href={alternateActionHref}>
              {alternatActionText}
            </a>
          </div>
      </form>
    );
  }
}
