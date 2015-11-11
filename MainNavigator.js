'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  SegmentedControlIOS,
  Image
} = React;

var MainTabBar = require('./MainTabBar');

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

var lightBackArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAA2FBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lb+eLAAAAR3RSTlMAAQIDBAYICQsMDQ4QERQXGBofJykqODlAQUlMUldeYWhrbW98f4KMlJWYnZ6goqutr7K0tbrAwcPMzs/T5ujp6+/z9ff7/dlYrXMAAAJCSURBVHja7dBXUlQBFEXR+wwtmHNWzBgxZzHDnf+M/LHUgg52lT++s/YM1q7639p/6enmxxeXJxXaxW/d3d1bVzL9d/pX94ZA/3r/0caQ7Q88sMMfd2CXP+zAFH/Ugan+oAMz/DEHZvpDDszxRxyY6w84sMA/+gML/SM/8Bf+7gfh/u4b4f7uo+H+Xg/39/ch2989Cff3ari/94X734T7+0K4//2Q7f+ymu3/eizcf5yfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn39a18P9J8P99SrcvxLur9Ph/jq31IDzo/PXmaUGfD4yugEHO/3A2/QDpzr9wK30A8NDBxxwwAEHHHDAAQcccMABBxxwwAEHHHBg2QOHHXDAAQcccMABBxxwYGwHHjnggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggANLHvjkgAMOOOCAAw444IADDjjggAMOOOCAAw6M7sCGAw444IADDix5YHOSfuB1pR84m37gZaUf2Jt+YKXCDxyo7ANbQ2UfuFuVfeBEZR+4XRV94MlQ0Qee7alKPjBu/+IDY/cvOjB+//wDCf55BzL8sw88D/HPOpDjn34gyT/tQJZ/94E0/84Def6q4f5v/+NAf1Vd3f7pvzlUZitr77a3P1w7VPon/QDqIm8Mnw8FiAAAAABJRU5ErkJggg==';
var darkBackArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABUtJREFUeJzt3dduXWUUhdG5jwkplHcD0p8m9PTee5MQoqT3Tr/nbYgluIgiHB07GMd7r+38Y0i+/9fFNxU5tk8CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArz0z1A2jWTJLzSdYl+bP2KcCQZpJcTvJ3ktkkW2ufAwxlkn/jf/k1m2RL5aOA/s0XvxGABkySXMr88RsBeIstJv65I7C55pnAcpskuZjFxW8E4C2ylPjnjsCm4Z8MLIdJkgtZWvxGAFaw5Yh/7ghsHPb5wFJN8uIn/JYjfiMAK0gf8b/8eh4jAKM1SXIu/cQ/dwQ2DHUQsDhDxG8EYIQmSc5mmPjnjsD6IY4DFlYRvxGAEaiM/+XXN71fCUzpUh//d0ne6ftQ4FVdkjOpjf/7iB8GJ35oVJfkdGrj/yHih8GNJf5VfR8KvKpLciq18f8Y8cPgxA+N6pKcTG38VyJ+GJz4oVFdkhOpjf9qxA+DEz80qktyPLXxX4v4YXBjif/dvg8FXtUlOZba+K9H/DA48UOjuiRHUxv/jYgfBid+aFSX5Ehq478Z8UMJ8UOjquO/lWR171cCU8QPjTqc2vhvR/xQQvzQqEMRPzSpOv47ET+UOJja+O8mWdP7lcAU8UOjDqQ2/nsRP5QQPzRqf8QPTaqO/37EDyX2RfzQpOr4HyRZ2/uVwJS9ET80qTr+hxE/lNgT8UOTquN/FPFDid0RPzRpDPGv6/1KYMqu1Mb/OOKHEuKHRu1MbfxPIn4oIX5o1I7Uxv804ocSY4j/vb6PBKZtT238zyJ+KCF+aNTXET80qTr+nyJ+KPFV6uN/v/crgSnV8f8c8UOJLyN+aFJ1/L9E/FDii4gfmjSG+D/o/Upgyuepjf/XiB9KiB8a9Vlq4/8t4ocS4odGfZra+H9P8mHvVwJTxA+N2hbxQ5O2pTb+PyJ+lmhS/QCAlW5b/CsAmuabgNA4IwCNG8MPAhkBKDSGEfDTgFCo+peBjAAUMwLQuOo/COLXgqFY9Qj4q0BQzB8FhcYZAWhc9QeDGAEoVj0CPiAEilV/OKgRgGLVI+BDQqHY9tSPgI8Jh0JGABq3I7Uj8CxGAEoZAWjcztSOwNMYAShlBKBxu1I/Auv6PhJYmBGAxu1O7Qg8iRGAUtUj8DhGAErtiRGAplWPwKMYASi1N/UjsLb3K4EFGQFo3L4YAWha9Qg8jBGAUtUj8CBGAErtjxGAplWPwP0YASh1IPUjsKb3K4EFGQFo3MEYAWha9QjcixGAUodSOwJ3YwSglBGAxh2OEYCmjWEEVvd+JbCgI6kdgTsxAlDKCEDDutSPwO0YASjTJTkaIwDNGsMI3IoRgDJdkmOpHYGbMQJQZiwj8G7fhwLz65IcjxGAZhkBaFyX5ERqR+BGjACUMQLQuC7JydSOwPUYASgzhhG4FiMAZYwANK5Lcir1I7Cq70OB+RkBaFyX5HRqR+BqjACUMQLQuC7JmdSOwJUYAShjBKBxkyRnUzsC3/Z+JbCgyhH4K8lH/Z8IvE7FCIgfRmSS5FyGif95ko+HOQtYrCFGQPwwYpMk59Nf/J8MdgmwJH2MgPhhBZkkuZDli3/9sM8H3tRyjMDzJBuGfjiwPN5kBJ4n2Tj8k4HlNElyMeKHZv2fEZiN+OGtM0lyKf8d/6aqBwL9et0IzCbZXPc0YAiTJJcjfmjW3BGYTbKl9jnA0Gby4r8It1Y/BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFn+AUwV+BRYw9uRAAAAAElFTkSuQmCC';

class TabBarNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rootNavigatorTitle: '',
      currentTabIndex: 0
    };
    this.navItems = {};
    this.navRouter = {};
    this.currentRoute = null;
    this.rootNavigatorItems = {};
    this.currentTabIndex = 0;

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
                <Image style={{width: 20, height: 20}} source={{uri: darkBackArrow}}/>
              </TouchableOpacity>
            );
          }
        }
        else {
          var navItems = self.rootNavigatorItems;
          var currentIndex = self.currentTabIndex;
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
          var currentIndex = self.currentTabIndex;
          if (navItems[currentIndex] && navItems[currentIndex].rightItem) {
            return React.cloneElement(navItems[currentIndex].rightItem.component, {
              onPress: () => {navItems[currentIndex].rightItem.event()}
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
              onPress: () => {navItems[currentIndex].title.event()}
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
    console.log('setting nav items. currentTabIndex: ' + this.currentTabIndex);
    if (this.currentRoute.isRoot) {
      this.rootNavigatorItems[this.state.currentTabIndex] = config;
      this.forceUpdate();
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
        style={{backgroundColor: this.props.navBarTintColor ? this.props.navBarTintColor : 'rgba(0,0,0,.8)', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}
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
