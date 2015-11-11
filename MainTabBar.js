'use strict';

import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} = React;


var style = StyleSheet.create({
  rootView: {
    flex: 1
  }
});

class MainTabBar extends Component {
  constructor(props) {
    super(props);
    this.tabBarData = [];
    this.state = {
      selectedTab: 0
    };
    this.configureTabBar();
  }
  configureTabBar() {
    var defaultTabIndex = 1;
    React.Children.map(this.props.initialConfig, function(eachChild, index) {
      var eachTabBarData = {
        id: index,
        title: eachChild.props.title,
        icon: eachChild.props.icon,
        component: eachChild.props.children
      };
      this.tabBarData.push(eachTabBarData);

      if (eachChild.props.defaultTab) {
        defaultTabIndex = index;
      }
    }.bind(this));
    this.setState({
      selectedTab: defaultTabIndex
    });
    this.props.navComponent.setNavigatorTitle(this.tabBarData[defaultTabIndex] ? this.tabBarData[defaultTabIndex].title : '');
    this.props.navComponent.setState({
      currentTabIndex: defaultTabIndex
    });
  }
  switchTab(tabName, tabTitle, currentTabIndex) {
    this.setState({
      selectedTab: tabName
    });
    this.props.navComponent.setNavigatorTitle(tabTitle);
    this.props.navComponent.setState({
      currentTabIndex: currentTabIndex
    });
  }
  renderTabBarItems() {
    var items = [];
    var self = this;
    for (var i = 0; i < this.tabBarData.length; i++) {
      var eachData = this.tabBarData[i];
      var eachComponent = React.cloneElement(eachData.component, {
        navigator: this.props.navigator,
        navComponent: this.props.navComponent
      });
      items.push(
        <TabBarIOS.Item
          title={eachData.title}
          icon={eachData.icon}
          selected={self.state.selectedTab === eachData.id}
          onPress={self.switchTab.bind(self, eachData.id, eachData.title, i)}>
          {eachComponent}
        </TabBarIOS.Item>
      );
    }
    return items;
  }
  render() {
    return (
      <TabBarIOS
        style={style.flexEnabled}
        tintColor={this.props.tabTintColor}
        barTintColor={this.props.tabBarTintColor}>
        {this.renderTabBarItems()}
      </TabBarIOS>
    );
  }
}

module.exports = MainTabBar;