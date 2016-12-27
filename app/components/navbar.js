import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
  render(){
    return (
      <div class="navbar">
      <Link to='/'>Home</Link>
      <Link to='/component1'>Component1</Link>
      <Link to='/component2'>Component2</Link>
      </div>
      );
  }
}

export default Navbar;