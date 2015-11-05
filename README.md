React Native TabBar Navigator (iOS only)
===================
A component which builds excellent Navigator + TabBar based application, have a good solution for implementing hidesBottomBarWhenPushed in iOS.

![react-native-tab](https://cloud.githubusercontent.com/assets/4535844/10962370/08ccac96-836e-11e5-9916-b984095f5168.gif)

Install
-------

```cd``` to your React Native project directory and run

```npm install react-native-tabbar-navigator --save```

Usage
-----
```
import TabBarNavigator from 'react-native-tabbar-navigator';
```

### The basic usages:
```
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
```
this.props.navigator.push({
  title: 'New Page',
  component: <NewPage/>
});
```
#### Changing the Navigator Bar Button
```
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
      }
    });
  }
}
```
___You can only change the Navigator Bar Buttons in the ```constructor``` (ES6) of the subviews, or ```componentWillMount```___

Advanced usage
------------------------------------
For more advanced examples, please check out the example app.

Configurations
------------------------------------
The **`<TabBarNavigator \>`** object can take the following props:
- `navTintColor`: The color of the text in Navigation Bar
- `navBarTintColor`: The background color of the Navigation Bar
- `tabTintColor`: The highlight color of the Tab Bar Item
- `tabBarTintColor`: The background color of the Tab Bar
- `onChange`: You can add your callback function here, it will be called once the selected tab is changed. It will bring you an ```Integer``` index when calling. Use like this way ```<TabBarNavigator onChange={callbackFunction} />``` and
```
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

The `leftItem` and the `rightItem` takes the same parameters:
- `component`: The component you want to render
- `event`: Takes a callback method, once the item clicked, it will be called. If is the Left Item, it will also passing an ```popHelper()``` back, call it when you want to pop the current page.

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
