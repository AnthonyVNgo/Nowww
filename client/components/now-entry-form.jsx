import React from 'react';

export default class NowwwEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      entry: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newNowEntry = {
      entry: this.state.entry
    };
    this.props.onSubmit(newNowEntry);
    this.setState({ entry: '' });
  }

  render() {
    const value = this.state.entry;
    return (
      <form className="input-group entry-input-form now-entry-form" onSubmit={this.handleSubmit}>
        <input
          required
          autoFocus
          type="text"
          value={value}
          className="form-control"
          placeholder="Add Nowww"
          onChange={this.handleChange} />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary row justify-content-center px-0 add-entry-btn">
              <PlusSquareSVG />
          </button>
        </div>
      </form>
    );
  }
}

function PlusSquareSVG(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  );
}
