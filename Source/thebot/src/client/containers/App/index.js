import React from 'react';
import $ from 'jquery';

import Header from '../../components/Header';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';

import { scrollDown } from '../../utils';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      clientName: null
    };
  }

  componentDidUpdate() {
    const el = this.refs.messageList;
    el.scrollTop = el.scrollHeight;
  }

  chat(input) {

    this.setState({
      messages: this.state.messages.concat({ from: 'You', text: input })
    });

    const postData = { input: input };

    if (this.state.clientName) {
      postData.clientName = this.state.clientName;
    }

    $.ajax({
      method: 'POST',
      url: '/',
      data: postData,
      success: data => {

        const newState = {
          messages: this.state.messages.concat({ from: 'Bot', text: data.text })
        };

        if (data.clientName) { newState.clientName = data.clientName; }

        this.setState(newState);
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <Header />
              </div>
              <div className="panel-body" ref="messageList">
                <MainSection messages={this.state.messages} />
              </div>
              <div className="panel-footer">
                <Footer chat={::this.chat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
