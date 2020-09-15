import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Button from './components/button';
import Ornament from './images/ornament.png';
import Onboarding from './images/onboarding_background.jpg';
import About from './images/about_text.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <img className="img-fluid" src={Onboarding} alt="Обложка словаря" />
          </div>
          <div className="col text-center">
            <img className="img-fluid" src={About} alt="Краткая информация" />
            <Button className="" title="My Button" img={Ornament} />
          </div>
        </div>
      </div>
    );
  }
}

export default hot(App);
