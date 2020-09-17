import React from 'react';
import PropTypes from 'prop-types';
import About from '../../images/about_text.jpg';

const Tabs = ({ tabs }) => (
  <div>
    <ul className="nav nav-tabs">
      {tabs.forEach(tab => (
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#about">
            {tab.title}
          </a>
        </li>
      ))}
    </ul>
    <div className="tab-content">
      <div className="tab-pane fade show active" id="about">
        <img className="img-fluid" src={About} alt="Предисловие" />
      </div>
      <div className="tab-pane in fade" id="instruction">instruction</div>
    </div>
  </div>
);

export class Tab {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

Tabs.propTypes = {
  // проверка, что это массив, из класса Tab //
  tabs: PropTypes.arrayOf(PropTypes.instanceOf(Tab)),
};

export default Tabs;
