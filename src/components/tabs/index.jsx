import React from 'react';
import PropTypes from 'prop-types';
import TabModel from './TabModel.js';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 0 };
  }

  changeCurrentTab(index) {
    this.setState({ currentTab: index });
  }

  render() {
    const tabsElements = this.props.tabs.map((tab, index) => {
      const activeClass = index === this.state.currentTab ? ' active' : '';
      return (
        <li className="nav-item" key={tab.title}>
          <a
            onClick={this.changeCurrentTab.bind(this, index)}
             className={'nav-link' + activeClass}
             onKeyDown={this.changeCurrentTab.bind(this, index)}
             role="link"
             tabIndex={index}
             data-toggle="tab"
          >
            {tab.title}
          </a>
        </li>
      );
    });

    const tabsContentElements = this.props.tabs.map((tab, index) => {
      const activeClass = index === this.state.currentTab ? ' active' : '';
      return (
        <div className={'tab-pane' + activeClass} key={tab.title}>
          <p className="myclass">kjli</p>
          <img className="img-fluid" src={tab.content} alt={tab.title} />
        </div>
      );
    });

    return (
      <div>
        <ul className="nav nav-tabs">{tabsElements}</ul>
        <div className="tab-content">{tabsContentElements}</div>
      </div>
    );
  }
}

Tabs.propTypes = {
  // проверка, что это массив, из класса Tab //
  tabs: PropTypes.arrayOf(PropTypes.instanceOf(TabModel)).isRequired,
};

export default Tabs;
