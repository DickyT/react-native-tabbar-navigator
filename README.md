React Native TabBar Navigator (iOS only)
===================
[![npm version](https://badge.fury.io/js/react-native-tabbar-navigator.svg)](https://badge.fury.io/js/react-native-tabbar-navigator)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)]()

A component which builds excellent Navigator(NavigationController) + TabBar(TabBarController) based application, have a good solution for implementing **hidesBottomBarWhenPushed** in iOS.

You can check out the sample App in React Native Playground
[https://rnplay.org/apps/XCZoBw](https://rnplay.org/apps/XCZoBw)

![react-native-tab](https://cloud.githubusercontent.com/assets/4535844/11086164/84be9b10-8824-11e5-8cf3-69ce3d01cb57.gif)

## UPDATEs
0.3.0 Test with several projects, and no obviously bug, so `0.3.0` will be a stable version.

0.2.8 Added a shadow style, make it more native, [preview](https://github.com/DickyT/react-native-tabbar-navigator/wiki/Description-of-0.2.8) 

0.2.7 Remove the hack on last commit, [reason](https://github.com/DickyT/react-native-tabbar-navigator/wiki/Description-of-removing-the-scale-hack)

0.2.6 Disabling the wired Y scale when pushing the view, which make it more similar to `NavigatorIOS`

0.2.4 Fixed a logical bug which caused a re-render issue.

0.2.3 New feature by `@aerofs`, title component can be customize now.

0.2 Stable Version

0.1 Project First Commit

Installation
-------

```cd``` to your React Native project directory and run

```npm install react-native-tabbar-navigator --save```

**The version on `npm` will be slower than github, because the version on `npm` will be the stable version, if you want the latest version, you can do this**

```npm install DickyT/react-native-tabbar-navigator```

Usage
-----
```jsx
import TabBarNavigator from 'react-native-tabbar-navigator';
```

### The basic usages:
```jsx
<TabBarNavigator
  navTintColor='ffffff'
  navBarTintColor='333333'
  tabTintColor='orange'
  tabBarTintColor='333333'
  onChange={(index)=>console.log(`selected index ${index}`)}>
  <TabBarNavigator.Item title='Tab 1' icon={{uri: base64Icon, scale: 3}}>
    <View style={style.tabContentStyle}>
        <Text>I am tab 1</Text>
    </View>
  </TabBarNavigator.Item>
  <TabBarNavigator.Item title='Tab 2' defaultTab>
    <TabTwo/>
  </TabBarNavigator.Item>
</TabBarNavigator>
```

### SubView usage
in this case, ```<TabTwo/>```

#### Pushing a view
```jsx
this.props.navigator.push({
  title: 'New Page',
  component: <NewPage/>
});
```
#### Changing the Navigator Bar Button, and customizing title component
```jsx
class TabTwo extends React.Component {
  constructor(props) {
    super(props);

    this.props.navComponent.setNavItems({
      leftItem: {
        component: (
          <TouchableOpacity style={[style.navItem, {marginRight: 7}]}>
            <Image style={{width: 20, height: 20}} source={{uri: shareImg}}/>
          </TouchableOpacity>
        ),
        event: function(popHelper) {
          popHelper();
          AlertIOS.alert('The event comes from Left NavBar Item');
        }.bind(this)
      },
      rightItem: {
        component: (
          <TouchableOpacity style={[style.navItem, {marginRight: 7}]}>
            <Image style={{width: 20, height: 20}} source={{uri: shareImg}}/>
          </TouchableOpacity>
        ),
        event: function() {
          AlertIOS.alert('The event comes from Share Button on NavBar');
        }.bind(this)
      },
      title: {
        component: (
          <View>
            <SegmentedControlIOS
                style={ styles.segmentControl }
                values={['Pinned', 'All']}
                selectedIndex={1}
            />
          </View>
        )
      }
    });
  }
}
```
___You can change the Navigator Bar Buttons whenever you like, but manage the original title/component at your own___

Advanced usage
------------------------------------
For more advanced examples, please check out the example app.

How to run the example App?
------------------------------------
Goto the example root directory, run
```npm install```
and
```npm start```
And open the project file ```TabBarNavigatorExample/ios/TabBarNavigatorExample.xcodeproj```, and run it in XCode.


If the Simulator said that the server is not running, you can run the npm server yourself, just run the command in the terminal.

```bash
sh The/Place/You/Put/The/Example/In/TabBarNavigatorExample/node_modules/react-native/packager/packager.sh
```

If you still cannot run the example, you can just create a new react native project by
```bash
react-native init TabBarNavigatorExample
```
Then ```cd`` into your root directory of the new project
```bash
npm install react-native-tabbar-navigator
```
Then you can copy the `index.ios.js` in my TabBarNavigatorExample and be sure to cover the default one.

And you can run the new project in XCode.

Configurations
------------------------------------
The **`<TabBarNavigator/>`** object can take the following props:
- `navTintColor`: The color of the text in Navigation Bar
- `navBarTintColor`: The background color of the Navigation Bar
- `tabTintColor`: The highlight color of the Tab Bar Item
- `tabBarTintColor`: The background color of the Tab Bar
- `onChange`: You can add your callback function here, it will be called once the selected tab is changed. It will bring you an ```Integer``` index when calling. Use like this way ```<TabBarNavigator onChange={callbackFunction} />``` and
```jsx
function callbackFunction(index) {
    console.log(`selected index ${index}`);
}
```

The **`this.props.navigator.push()`** takes one ```Object``` which can have the following keys:
- `title` (required): The title of the incoming view
- `component` (required): The component you want to push.

The **`this.props.navigator.setNavItems()`** takes one ```Object``` which can have the following keys:
- `leftItem`: Takes an ```Object```, parameters below
- `rightItem`: Takes an ```Object```, parameters below
- `title`: Taks **ONLY** `component` parameters ,if you do not specify, and default will be uesed

The `leftItem` and the `rightItem` takes the same parameters:
- `component` (required): The component you want to render
- `event` (required): Takes a callback method, once the item clicked, it will be called. If is the Left Item, it will also passing an ```popHelper()``` back, call it when you want to pop the current page.

Questions
--------------
If something is undocumented here, and it is not clear with you, feel free to create an issue here, I will tried my best to answer you.

Anything else
--------------
Feel free to request new features, just create an issue.
It will be very welcome to pull request for me.

My email ```me@idickyt.com```

Facebook [Dicky Tsang](https://www.facebook.com/idickytsang)

Sina Weibo ```@桐乃```
