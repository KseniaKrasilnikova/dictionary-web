import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Button from './components/button';
import Tabs, { Tab } from './components/tabs';
import Ornament from './images/ornament.png';
import Onboarding from './images/onboarding_background.jpg';
import About from './images/about_text.jpg';
import Instruction from './images/onboarding_text.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const tabs = [
      new Tab('Предисловие', About),
      new Tab('Как использовать', Instruction),
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <img className="img-fluid" src={Onboarding} alt="Обложка словаря" />
          </div>
          <div className="col-12 col-md-6 text-center">
            {/* компонент реакта Tabs в нем пропс tabs */}
            <Tabs tabs={tabs} />
            <Button className="" title="Аудиословарь" img={Ornament} />
          </div>
        </div>
      </div>
    );
  }
}

export default hot(App);
