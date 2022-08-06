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

// now-entry-form.jsx
// line 13. onChange event handler handleChange, executes evertime a change is made in the input
// line 14. this.state.entry is updated to the value of event.target.value
// line 14. the value of event.target.value is whatever is entered into the input

// line 19. onSubmit event handler handleSubmit, executes when user hits the submit button for the NowEntryForm component
// line 21. a variable is defined and is assigned the value / stores an OBJECT with the property of entry, that stores the value of this.state.entry they are not the same.
// line 24. the onSubmit event handler, handleSubmit calls the function returned from this.props.onSubmit
// line 24. the function returned from this.props.onSubmit is the addNowEntry method passsed as the NowwwEntryForm's onSubmit property's value
// line 24. the addNowEntry function takes the variable newNowEntry as an argument

// update-my-now.jsx
// line 66. addNowEntry(newNowEntry) has 1 parameter and takes the NewNowEntry variable from now-entry-from.jsx as an argument
// line 72. the fetch POST request req.body is set as the returned value from JSON.stringify(newNowEntry) - the JSON version of the newNowEntry value
// line 75. nowArr is assigned the value of this.state.nowEntry, an array meant to store an array/list of now-entries
// line 80. after the client's fetch POST request, the server, Node + Express, responds with.. to be continued
