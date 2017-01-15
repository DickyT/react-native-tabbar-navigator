/**
 * Root TabBar for TabBarNavigator
 * https://github.com/DickyT/react-native-tabbar-navigator
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

class RootTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.selectedTab || 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.onChange(this.state.selectedTab);
    }, 0);
  }

  switchTab(index) {
    this.setState({ selectedTab: index });
    this.props.onChange(index);
  }

  items() {
    let componentList = [];

    React.Children.map(this.props.children, (component, index) => {
      let tabComponent = React.cloneElement(component.props.children, {
        navigator: this.props.navigator
      });
      // add to tabbar
      componentList.push(
        <TabBarIOS.Item
          key={`nvgtr/tbr/item/${index}`}
          selected={this.state.selectedTab === index}
          onPress={() => this.switchTab(index)}
          {...component.props}>
          { tabComponent }
        </TabBarIOS.Item>
      );
    });
    return componentList;
  }

  render() {
    return (
      <TabBarIOS {...this.props}>
        {this.items()}
      </TabBarIOS>
    );
  }
};

RootTabBar.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default RootTabBar;
