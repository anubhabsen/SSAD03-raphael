import React from 'react';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = this.refs.input;
    this.props.chat(input.value);
    input.value = '';
  }

  render() {
    return (
      <form>
        <div className="input-group">
          <input
            autoFocus
            className="form-control input-sm"
            ref="input"
            placeholder="Say something" />
          <span className="input-group-btn">
            <button
              className="btn btn-warning btn-sm"
              type="submit"
              onClick={::this.handleSubmit}>
              Say it!
            </button>
          </span>
        </div>
      </form>
    )
  }

}

export default ChatForm;
