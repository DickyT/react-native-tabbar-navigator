'use strict';

var React = require('react-native');
var {
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
  }
  componentWillMount() {
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
    this.props.navComponent.currentTabIndex = defaultTabIndex;
    this.props.navComponent.setState({
      rootNavigatorTitle: this.tabBarData[defaultTabIndex].title
    });
  }
  switchTab(tabId, tabTitle, currentTabIndex) {
    this.props.navComponent.currentTabIndex = currentTabIndex;
    this.props.navComponent.setState({
      currentTabIndex: currentTabIndex,
      rootNavigatorTitle: tabTitle
    });
    this.props.navComponent.forceUpdate();
    this.setState({
      selectedTab: tabId
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
          key={i}
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