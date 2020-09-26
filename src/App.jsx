import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Button from './components/button';
import Tabs from './components/tabs';
import Ornament from './images/ornament.png';
import Onboarding from './images/onboarding_background.jpg';
import About from './images/about_text.jpg';
import Instruction from './images/onboarding_text.jpg';
import TabModel from './components/tabs/TabModel';

class App extends Component {
  render() {
    const tabsValue = [
      new TabModel('Предисловие', About),
      new TabModel('Как использовать', Instruction),
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <img className="img-fluid" src={Onboarding} alt="Обложка словаря" />
          </div>
          <div className="col-12 col-md-6 text-center">
            {/* компонент реакта Tabs в нем пропс tabs */}
            <Tabs tabs={tabsValue} />
            <Button className="" title="Аудиословарь" img={Ornament} />
          </div>
        </div>
      </div>
    );
  }
}

export default hot(App);
