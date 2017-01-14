React Native TabBar Navigator (iOS only)
===================
[![npm version](https://badge.fury.io/js/react-native-tabbar-navigator.svg)](https://badge.fury.io/js/react-native-tabbar-navigator)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)]()

A component which builds excellent Navigator(NavigationController) + TabBar(TabBarController) based application, have a good solution for implementing **hidesBottomBarWhenPushed** in iOS.

![PREVIEW](https://cloud.githubusercontent.com/assets/4535844/21953824/7924d0b2-da17-11e6-8001-caad1150fdcc.gif)

## SPECIAL NOTE FOR 0.4.0
Please don't update to 0.4.0 if you are using previous version of this plugin, because the way to use it is completely different. Document is not yet finished, but a Demo App is available [Here](https://github.com/DickyT/react-native-tabbar-navigator/wiki/%5B0.4.0%5DDemo-App-of-0.4.0-updated,-supports-React-Native-0.40)

## UPDATEs
0.4.0 Supports React Native `0.40`, optimized usages.

0.3.0 Test with several projects, and no obviously bug, so `0.3.0` will be a stable version.

0.2.8 Added a shadow style, make it more native, [preview](https://github.com/DickyT/react-native-tabbar-navigator/wiki/Description-of-0.2.8) 

0.2.7 Remove the hack on last commit, [reason](https://github.com/DickyT/react-native-tabbar-navigator/wiki/Description-of-removing-the-scale-hack)

0.2.6 Disabling the wired Y scale when pushing the view, which make it more similar to `NavigatorIOS`

0.2.4 Fixed a logical bug which caused a re-render issue.

0.2.3 New feature by `@aerofs`, title component can be customize now.

0.2 Stable Version

0.1 Project First Commit

## Installation

`cd` to your React Native project directory and run

`npm i --save react-native-tabbar-navigator`

## Usage

```jsx
import { TabNavigator } from 'react-native-tabbar-navigator';
```

### The basic usages:
```jsx
function RootView() {
  let navItems = [
    {
      leftItem: {
        component: (<NavItemText/>),
        onPress: (isRoot, pop) => {
          ActionSheetIOS.showActionSheetWithOptions({
            options: ['View Account Info', 'My Orders', 'Sign Out'],
            destructiveButtonIndex: 2
          }, () => {});
        }
      },
      rightItem: {
        component: (<NavItemIcon/>),
        onPress: (isRoot, pop) => {
          ActionSheetIOS.showActionSheetWithOptions({
            options: ['Share', 'Scan QR Code', 'Cancel'],
            destructiveButtonIndex: 2
          }, () => {});
        }
      }
    },
    {
      title: {
        component: (<NavItemSegmentCtrl/>)
      },
      rightItem: {
        component: (<NavItemIconSettings/>),
        onPress: (isRoot, pop) => {
          ActionSheetIOS.showActionSheetWithOptions({
            options: ['Account Settings', 'App Settings', 'Cancel'],
            destructiveButtonIndex: 2
          }, () => {});
        }
      }
    }
  ];
  return (
    <TabNavigator tintColor='#FF2D55'>
      <TabNavigator.Item title='Tab One' icon={{uri: tabOneIcon, scale: 3}} navItems={navItems[0]} defaultTab>
        <TabOneIndex/>
      </TabNavigator.Item>
      <TabNavigator.Item title='Tab Two' icon={{uri: tabTwoIcon, scale: 3}} navItems={navItems[1]}>
        <TabTwoIndex/>
      </TabNavigator.Item>
    </TabNavigator>
  );
}
```

## Advanced usage

For more advanced examples, please check out the example app.

## How to run the example App?
Xcode.

Questions
--------------
If something is undocumented here, and it is not clear with you, feel free to create an issue here, I will tried my best to answer you.

Anything else
--------------
Feel free to request new features, just create an issue.
It will be very welcome to pull request for me.

My email `me@idickyt.com`

Facebook [Dicky Tsang](https://www.facebook.com/idickytsang)

Sina Weibo [@桐乃](https://weibo.com/kirinokousaka)
