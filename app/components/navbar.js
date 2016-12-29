import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
  render(){
    return (
      <div className="navbar">
      <p><Link to='/'>Home</Link></p>
      <p><Link to='/component1'>Component1</Link></p>
      <p><Link to='/component2'>Component2</Link></p>
      </div>
      );
  }
}

export default Navbar;