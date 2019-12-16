import React, { Component} from 'react';
import spinner from '../images/spinner.svg';

class Spinner extends Component {
  render() {
    return (
      <img
        src = {spinner}
        alt = "One second while we fetch your results"
        className = "spinner"
      />
    );
  }
}

export default Spinner;
