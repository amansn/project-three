import React from 'react';
import Header from '../components/Header';

const Main = React.createClass({
  render: function() {
    return (
      <div className="content">
        <Header />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

export default Main;
