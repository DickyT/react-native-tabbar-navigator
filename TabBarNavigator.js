/**
 * Navigator Wrapper for TabBarNavigator
 * https://github.com/DickyT/react-native-tabbar-navigator
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image,
  NavigatorIOS
} from 'react-native';
import RootTabBar from './RootTabBar';

const __STYLE = StyleSheet.create({
  flexEnabled: {
    flex: 1
  },
  leftBackButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 7
  },
  leftBackButtonWrapper: {
    width: 20,
    height: 20
  },
  navBar: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  navBarTitle: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 17,
    marginTop: 10
  },
  mainTabBar: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  sceneStyle: {
    shadowColor: '#000000',
    shadowOpacity: .5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    overflow: 'visible',
    flex: 1,
    marginTop: 64,
    backgroundColor: '#ffffff'
  },
  mainNavigator: {
    backgroundColor: 'transparent'
  }
});

const lightBackArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAA2FBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lb+eLAAAAR3RSTlMAAQIDBAYICQsMDQ4QERQXGBofJykqODlAQUlMUldeYWhrbW98f4KMlJWYnZ6goqutr7K0tbrAwcPMzs/T5ujp6+/z9ff7/dlYrXMAAAJCSURBVHja7dBXUlQBFEXR+wwtmHNWzBgxZzHDnf+M/LHUgg52lT++s/YM1q7639p/6enmxxeXJxXaxW/d3d1bVzL9d/pX94ZA/3r/0caQ7Q88sMMfd2CXP+zAFH/Ugan+oAMz/DEHZvpDDszxRxyY6w84sMA/+gML/SM/8Bf+7gfh/u4b4f7uo+H+Xg/39/ch2989Cff3ari/94X734T7+0K4//2Q7f+ymu3/eizcf5yfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn39a18P9J8P99SrcvxLur9Ph/jq31IDzo/PXmaUGfD4yugEHO/3A2/QDpzr9wK30A8NDBxxwwAEHHHDAAQcccMABBxxwwAEHHHBg2QOHHXDAAQcccMABBxxwYGwHHjnggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggANLHvjkgAMOOOCAAw444IADDjjggAMOOOCAAw6M7sCGAw444IADDix5YHOSfuB1pR84m37gZaUf2Jt+YKXCDxyo7ANbQ2UfuFuVfeBEZR+4XRV94MlQ0Qee7alKPjBu/+IDY/cvOjB+//wDCf55BzL8sw88D/HPOpDjn34gyT/tQJZ/94E0/84Def6q4f5v/+NAf1Vd3f7pvzlUZitr77a3P1w7VPon/QDqIm8Mnw8FiAAAAABJRU5ErkJggg==';

class TabBarNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rootRouteTitle: '',
      selectedTab: 0
    };

    this.navRouter = {
      LeftButton: this.LeftButton.bind(this),
      RightButton: this.RightButton.bind(this),
      Title: this.Title.bind(this),
    };

    this.navBar = (
      <Navigator.NavigationBar
        style={[__STYLE.navBar, { backgroundColor: this.props.navBarTintColor }]}
        routeMapper={this.navRouter}
        {...this.props.navBarProps}/>
    );

    // find defaultTab
    React.Children.map(this.props.children, (component, index) => {
      if (component.props.defaultTab) {
        this.state.selectedTab = index;
      }
    });

    this.initialRoute = {
      isRoot: true,
      component: <RootTabBar {...this.props} onChange={this.tabChanged.bind(this)} selectedTab={this.state.selectedTab}/>
    };
  }

  tabChanged(index) {
    this.setState({
      selectedTab: index
    });
    this.props.onChange(index);
  }

  LeftButton({ isRoot, navItems: { leftItem } = {} } = {}, navigator) {
    if (isRoot) {
      // handle dynamic left item with TabBar
      let currentTab = this.props.children[this.state.selectedTab].props.navItems;
      leftItem = currentTab.leftItem || null;
    }

    if (leftItem) {
      // if left item is set, not using default component
      return React.cloneElement(leftItem.component, {
        onPress: () => leftItem.onPress && leftItem.onPress(isRoot, navigator.pop, navigator)
      });
    }
    else if (!isRoot) {
      // not root and left item not assigned, using default component
      return (
        <TouchableOpacity
          style={__STYLE.leftBackButton}
          onPress={navigator.pop}>
          <Image style={__STYLE.leftBackButtonWrapper}
            source={{uri: lightBackArrow}}/>
        </TouchableOpacity>
      );
    }
  }

  RightButton({ isRoot, navItems: { rightItem } = {} } = {}, navigator) {
    if (isRoot) {
      // handle dynamic right item with TabBar
      let currentTab = this.props.children[this.state.selectedTab].props.navItems;
      rightItem = currentTab.rightItem || null;
    }

    if (rightItem) {
      // if right item is set, not using default component
      return React.cloneElement(rightItem.component, {
        onPress: () => rightItem.onPress && rightItem.onPress(isRoot, navigator.pop, navigator)
      });
    }
  }

  Title({ isRoot, title } = {}, navigator) {
    if (isRoot) {
      // handle dynamic title component with TabBar
      let componentProps = this.props.children[this.state.selectedTab].props;
      let currentTab = componentProps.navItems.title ? componentProps.navItems : componentProps;
      title = currentTab.title || '';
    }

    if (title) {
      let { component, text, onPress } = title;
      if (typeof(title) == 'string') {
        text = title;
      }

      if (component) {
        // set title component
        return React.cloneElement(component, {
          onPress: () => onPress && onPress(isRoot, navigator.pop, navigator)
        });
      }
      else if (text) {
        // set title text
        return (
          <Text style={[__STYLE.navBarTitle, { color: this.props.navTintColor }]}>
            {text}
          </Text>
        );
      }
    }
  }

  renderScene({ component }, navigator) {
    return React.cloneElement(component, {
      navigator: navigator
    });
  }

  render() {
    return (
      <Navigator
        style={[__STYLE.flexEnabled, __STYLE.mainNavigator]}
        initialRoute={this.initialRoute}
        renderScene={this.renderScene.bind(this)}
        navigationBar={this.navBar}
        sceneStyle={__STYLE.sceneStyle}
        {...this.props}/>
    );
  }
}

TabBarNavigator.propTypes = {
  navTintColor: React.PropTypes.string,
  navBarTintColor: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

TabBarNavigator.defaultProps = {
  navTintColor: '#FFFFFF',
  navBarTintColor: '#FF2D55',
  onChange: () => {}
};

TabBarNavigator.Item = () => <View/>;

TabBarNavigator.Item.propTypes = {
  navItems: React.PropTypes.object,
  children: React.PropTypes.element.isRequired
};

TabBarNavigator.Item.defaultProps = {
  navItems: {}
};

export default TabBarNavigator;
