import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class HomePage extends Component {
  constructor () {
    super();

    this.state = {
      text: 'HomePage'
    }
  }

  render () {
    return <div className="homepage">
      <Typography component="h1">{this.state.text}</Typography>
    </div>
  }
}

export default HomePage;
