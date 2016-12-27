import React from 'react';
import Navbar from './navbar';
class App extends React.Component {
  render() {
    return (
      <div>
      <h1>This is the App</h1>
      <Navbar history={this.props.history} />
      <br />
        {this.props.children}
      </div>
    );
  }
}

export default App;