'use strict';

import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  SegmentedControlIOS,
  Image
} = React;

import MainTabBar from './MainTabBar.js';

var style = StyleSheet.create({
  flexEnabled: {
    flex: 1
  },
  leftBackButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 7
  }
});

const backArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAA2FBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lb+eLAAAAR3RSTlMAAQIDBAYICQsMDQ4QERQXGBofJykqODlAQUlMUldeYWhrbW98f4KMlJWYnZ6goqutr7K0tbrAwcPMzs/T5ujp6+/z9ff7/dlYrXMAAAJCSURBVHja7dBXUlQBFEXR+wwtmHNWzBgxZzHDnf+M/LHUgg52lT++s/YM1q7639p/6enmxxeXJxXaxW/d3d1bVzL9d/pX94ZA/3r/0caQ7Q88sMMfd2CXP+zAFH/Ugan+oAMz/DEHZvpDDszxRxyY6w84sMA/+gML/SM/8Bf+7gfh/u4b4f7uo+H+Xg/39/ch2989Cff3ari/94X734T7+0K4//2Q7f+ymu3/eizcf5yfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn39a18P9J8P99SrcvxLur9Ph/jq31IDzo/PXmaUGfD4yugEHO/3A2/QDpzr9wK30A8NDBxxwwAEHHHDAAQcccMABBxxwwAEHHHBg2QOHHXDAAQcccMABBxxwYGwHHjnggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggANLHvjkgAMOOOCAAw444IADDjjggAMOOOCAAw6M7sCGAw444IADDix5YHOSfuB1pR84m37gZaUf2Jt+YKXCDxyo7ANbQ2UfuFuVfeBEZR+4XRV94MlQ0Qee7alKPjBu/+IDY/cvOjB+//wDCf55BzL8sw88D/HPOpDjn34gyT/tQJZ/94E0/84Def6q4f5v/+NAf1Vd3f7pvzlUZitr77a3P1w7VPon/QDqIm8Mnw8FiAAAAABJRU5ErkJggg==';

class TabBarNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rootNavigatorTitle: '默认标题',
      currentTabIndex: 0
    };
    this.navItems = {};
    this.navRouter = {};
    this.currentRoute = null;
    this.rootNavigatorItems = [];

    var self = this;
    this.navRouter = {
      LeftButton(route, navigator, index, navState) {
        if (!route.isRoot) {
          if (route.navItems && route.navItems.leftItem) {
            return React.cloneElement(route.navItems.leftItem.component, {
              onPress: () => {route.navItems.leftItem.event(self.popThisNavigator.bind(self, navigator))}
            });
          }
          else {
            return (
              <TouchableOpacity style={style.leftBackButton} onPress={() => {
                self.popThisNavigator(navigator);
              }}>
                <View style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon
                    name={'fontawesome|angle-left'}
                    size={30}
                    color='ffffff'
                    style={{width: 30, height: 30}}
                    />
                </View>
              </TouchableOpacity>
            );
          }
        }
        else {
          var navItems = self.rootNavigatorItems;
          var currentIndex = self.state.currentTabIndex;
          if (navItems[currentIndex] && navItems[currentIndex].leftItem) {
            return React.cloneElement(navItems[currentIndex].leftItem.component, {
              onPress: () => {navItems[currentIndex].leftItem.event(self.popThisNavigator.bind(self, navigator))}
            });
          }
        }
      },
      RightButton(route, navigator, index, navState) {
        if (!route.isRoot) {
          if (route.navItems && route.navItems.rightItem) {
            return React.cloneElement(route.navItems.rightItem.component, {
              onPress: () => {route.navItems.rightItem.event()}
            });
          }
        }
        else {
          var navItems = self.rootNavigatorItems;
          var currentIndex = self.state.currentTabIndex;
          if (navItems[currentIndex] && navItems[currentIndex].rightItem) {
            return React.cloneElement(navItems[currentIndex].rightItem.component, {
              onPress: () => {navItems[currentIndex].rightItem.event(self.popThisNavigator.bind(self, navigator))}
            });
          }
        }
      },
      Title(route, navigator, index, navState) {
        if (!route.isRoot) {
          if (route.navItems && route.navItems.title) {
            return React.cloneElement(route.navItems.title.component, {
              onPress: () => {route.navItems.title.event()}
            });
          }
        }
        else {
          var navItems = self.rootNavigatorItems;
          var currentIndex = self.state.currentTabIndex;
          if (navItems[currentIndex] && navItems[currentIndex].title) {
            return React.cloneElement(navItems[currentIndex].title.component, {
              onPress: () => {navItems[currentIndex].title.event(self.popThisNavigator.bind(self, navigator))}
            });
          }
        }
        return (
          <Text style={{flex: 1, justifyContent: 'center', color: self.props.navTintColor ? self.props.navTintColor : 'ffffff', fontSize: 17, marginTop: 12}}>
            {route.isRoot ? self.state.rootNavigatorTitle : route.title}
          </Text>
        );
      }
    };
  }
  setNavItems(config) {
    if (this.currentRoute.isRoot) {
      this.rootNavigatorItems[this.state.currentTabIndex] = config;
    }
    else {
      this.currentRoute.navItems = config;
    }
  }
  popThisNavigator(navigator) {
    this.resetNavItems();
    this.forceReRender();
    navigator.pop();
  }
  resetNavItems() {
    this.navItems.rightItem = false;
    this.navItems.titleItem = false;
    this.navItems.leftItem = false;
  }
  forceReRender() {
    this.setState({
      forceReRender: !this.state.forceReRender
    });
  }
  renderScene(route, navigator) {
    this.currentRoute = route;
    this.resetNavItems();
    var newComponent = React.cloneElement(route.component, {
      navigator: navigator,
      navComponent: this
    });
    return (
      <View style={{flex: 1, marginTop: 64}}>
        {newComponent}
      </View>
    );
  }
  setNavigatorTitle(newTitle) {
    this.setState({
      rootNavigatorTitle: newTitle
    });
  }
  render() {
    var initialRoute = {
      title: '',
      isRoot: true,
      component: (
        <MainTabBar {...this.props} initialConfig={this.props.children} onChange={this.props.onChange}/>
      )
    };
    var navBar = (
      <Navigator.NavigationBar
        style={{backgroundColor: this.props.navBarTintColor ? this.props.navBarTintColor : 'rgba(0,0,0,.8)', alignItems: 'center'}}
        routeMapper={this.navRouter}
        />
    );
    return (
      <Navigator
        ref='navigator'
        style={[style.flexEnabled, {backgroundColor: 'transparent'}]}
        initialRoute={initialRoute}
        renderScene={this.renderScene.bind(this)}
        navigationBar={navBar}
        />
    );
  }
}

class TabBarNavigatorItem extends Component {
  render() {
    return <View/>;
  }
}

TabBarNavigator.Item = TabBarNavigatorItem;

module.exports = TabBarNavigator;
