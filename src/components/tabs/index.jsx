import React from 'react';
import PropTypes from 'prop-types';
import About from '../../images/about_text.jpg';
import TabModel from './TabModel.js';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 0 };
  }

  render() {
    const tabsElements = this.props.tabs.map((tab) => (
      <li className="nav-item" key={tab.title}>
        <a className="nav-link" data-toggle="tab">
          {tab.title}
        </a>
      </li>
    ));
    return (
      <div>
        <ul className="nav nav-tabs">{tabsElements}</ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="about">
            <img className="img-fluid" src={About} alt="Предисловие" />
          </div>
          <div className="tab-pane in fade" id="instruction">
            instruction
          </div>
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  // проверка, что это массив, из класса Tab //
  tabs: PropTypes.arrayOf(PropTypes.instanceOf(TabModel)).isRequired,
};

export default Tabs;
