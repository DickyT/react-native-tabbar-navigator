'use strict';

import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SegmentedControlIOS,
  AlertIOS,
  Image
} = React;

import TabBarNavigator from 'react-native-tabbar-navigator';

const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
const shareImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACIlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8xtw6+AAAAtXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhscHR4fICEiIyQlJicqKywuLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0lKS0xNTk9QUVJUVVdYWVxeX2FiY2RmZ2hpa2xtb3Bxc3R1d3h7f4CCg4WGiImLjI6PkZKUlZeYmpudnqCio6WmqKqrra+wsrS1t7m6vL7AwcPFx8jKzM7P0dPV19na3N7g4uTm6Onr7e/x8/X3+fv909B6DgAADGpJREFUeNrtXftfE8cWn2yAxPIKLxW41JqI6CU8Lg1cUQpYleKt9sa01+oVpbZqtfVVERVQtBaNPGpFEFQ0FBUqUBQM+/9dgt6PSjOzZ3YHMmeX7+9zMt+T3dkzZ875DiHooSS7qxtbg32hifBEqC/Y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';
const arrowImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAABa1BMVEUAAAD8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwP8AwPj53TrAAAAeHRSTlMAAQIDBAUHCAkKCwwOEBEUFRYXGRoeHyAhIiMkJSYnKCkqKywtLi8wMTIzNzg5PD9AQkNFR0lNUFFSVFVbXV5iY2RmZ294eXt8gIKDhYaIiYuMjo+RkpSVl5iam52eoqivtLW3vsPFyMzP09ze4ubp7e/x8/X5+/2lMJsqAAACwklEQVR42u3d2U5TYRiF4dXJYhVUFKkgalWUKs4KzjhbB6SOSKkDdcCxINLyXb4HoqlwYoiJSde77uB5D3Z2/v0nW2KMMcYYY4wxxhhjjDHGGGP/bx3HX9Qjol45us6Rny3F7y3dyNj5C4vRuvkeM/9orNwxK/9QrN5pI//GRngXqERYF9gc4V1gLMwLfAzvAskI7wIdYV6gK8wL5MK8QDrcC8y5F7gd5gUGwr3AO/cC+XAvcNW+wHP3AokqBShAAfsC0xSggH2BCgUoQAH7AlMUoAAF7AtwPkABClBgkgIUsC/wjAL2X0woQIGnFKCAfYEnFKAABewLPKaAfYFHFKAABewLPKQABShgX6BMAQrYF5igAAXsCzygAAXsC4xTgAIUsC9wnwIUoIB9gXsUsC9wlwIUsC9whwJrK5DpP3L2YlvsSmMNBYozYbY/CnS/D7+1FBhuRjgXOBOmO/zT3+fqj+YWSUp/sw0QnxOSrofxTknppnOAOWkwrLfpr94b23ijeuMd4Ja+egeY1oJ3gFea9Q4wrqp3gGsa8Q5QUKd3gJRUc/aXJW11DpCTpJKv/7IkKfHa1T+1fCKUMi1QS/46E0uUvP2SttW8/ZI6R6qzC8b+dlpPA7+zfzt+/Mb+Xvz48eN39TfxO/vz+K39O/Bb+/vw48ePH7+lvx8/fmP/TvzW/oEl/Pjx48fv6N+FH7+xfzd+/Mb+PfjxG/sL+PHjt/XvxY/f2L8Pv7c/8Dv79+O39g/it/YfwI8fP35T/0H8+I39Q/h5/hv7u83vf2bq3n7dNPfnzP06b+7XW3N/0tyvrLlfXeZ+bTD3K2Pul76b+1U296to7lfii7dfGjb3S5PmfiVX//ZtxskvpV6u8E8kZLYLiy38+ZPyW+bSp2X+h3MpeW59/tCJYm9WjDHGGGOMMcYYY4wxxhhjjP2r/QD5wMmbST2PxgAAAABJRU5ErkJggg==';

var style = StyleSheet.create({
  rootView: {
    flex: 1
  },
  tabContentStyle: {
    flex: 1,
    backgroundColor: 'ebebeb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#333333',
    marginBottom: 25,
    fontSize: 17
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowImage: {
    width: 200,
    height: 200,
    transform:[{rotate: '-45deg'}],
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0
  }
});

class AnotherNewPage extends Component {
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
      title:{
        component: (
          <View
            style={styles.segmentControlContainer} >
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
  pushPage() {
    this.props.navigator.push({
      title: 'New Page',
      component: <AnotherNewPage/>
    });
  }
  render() {
    return (
      <View style={style.tabContentStyle}>
        <Text style={style.textStyle}>This is the content of New Page</Text>
        <Text style={style.textStyle}>You can also set the Bar Item on the Left</Text>
        <View style={{position: 'absolute', top: 20, right: 10}}>
          <Text style={style.textStyle}>I also have callback function</Text>
          <Text style={style.textStyle}>Try to touch me</Text>
        </View>
        <Image style={[style.arrowImage, {left: 0, transform:[{rotate: '-135deg'}]}]} source={{uri: arrowImg}}/>
        <TouchableOpacity onPress={this.pushPage.bind(this)}>
          <Text style={[style.textStyle, {color: 'rgb(0,122,255)'}]}>Touch to push page infinitely</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class NewPage extends Component {
  constructor(props) {
    super(props);
    this.props.navComponent.setNavItems({
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
  pushPage() {
    this.props.navigator.push({
      title: 'Another New Page',
      component: <AnotherNewPage/>
    });
  }
  render() {
    return (
      <View style={style.tabContentStyle}>
        <Text style={style.textStyle}>This is the content of New Page</Text>
        <Text style={style.textStyle}>You can also set the Bar Item on the right</Text>
        <View style={{position: 'absolute', top: 20, left: 20}}>
          <Text style={style.textStyle}>I have callback function</Text>
          <Text style={style.textStyle}>Try to touch me</Text>
        </View>
        <Image style={style.arrowImage} source={{uri: arrowImg}}/>
        <TouchableOpacity onPress={this.pushPage.bind(this)}>
          <Text style={[style.textStyle, {color: 'rgb(0,122,255)'}]}>Touch to push another new page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class TabOne extends Component {
  constructor(props) {
    super(props);
    this.props.navComponent.setNavItems({
      title: {
        component: (
          <View
            style={styles.segmentControlContainer} >
            <SegmentedControlIOS
                style={ styles.segmentControl }
                values={['Pinned', 'All']}
                selectedIndex={1}
            />
          </View>
        ),
        event: function() {
          AlertIOS.alert('The event comes from title on NavBar');
        }.bind(this)
      }
    });
  }
  render() {
    return (
      <View style={style.tabContentStyle}>
        <Text style={style.textStyle}>This is the content of Tab 1</Text>
        <Text style={style.textStyle}>Automatically marginTop = 64</Text>
        <Text style={style.textStyle}>TabBarNavigator.Item is the OnlyChild</Text>
        <Text style={style.textStyle}>You can wrap everything inside {'<View></View>'}</Text>
        <Text style={style.textStyle}>Slide to back is fully supported</Text>
      </View> 
    );
  }
}

class TabTwo extends Component {
  constructor(props) {
    super(props);
    this.props.navComponent.setNavItems({
      title: {
        component: (
          <TouchableOpacity style={[style.navItem, {marginRight: 7}]}>
            <Image style={{width: 20, height: 20}} source={{uri: shareImg}}/>
          </TouchableOpacity>
        ),
        event: function() {
          AlertIOS.alert('The event comes from title on NavBar');
        }.bind(this)
      }
    });
  }
  pushPage() {
    this.props.navigator.push({
      title: 'New Page',
      component: <NewPage/>
    });
  }
  render() {
    return (
      <View style={style.tabContentStyle}>
        <Image style={[style.arrowImage, {left: 50, top: -50, transform:[{rotate: '-75deg'},{scale: .5}]}]} source={{uri: arrowImg}}/>
        <Text style={[style.textStyle, {marginTop: -50, marginBottom: 50}]}>Title bar can be customized with click event</Text>
        <Text style={style.textStyle}>This is the content of Tab 2</Text>
        <Text style={[style.textStyle, {marginBottom: 0}]}>A good implementation of</Text>
        <Text style={style.textStyle}>hidesBottomBarWhenPushed</Text>
        <Text style={style.textStyle}>Set as default by passing Props 'defaultTab'</Text>
        <TouchableOpacity onPress={this.pushPage.bind(this)}>
          <Text style={[style.textStyle, {color: 'rgb(0,122,255)'}]}>Try to push a new page</Text>
        </TouchableOpacity>
        <Text style={style.textStyle}>And see the magic on the TabBar</Text>
      </View>
    );
  }
}

class TabBarNavigatorExample extends Component {
  render() {
    return (
      <TabBarNavigator
        navTintColor='ffffff'
        navBarTintColor='333333'
        tabTintColor='orange'
        tabBarTintColor='333333'
        onChange={(index)=>console.log(`selected index ${index}`)}>
        <TabBarNavigator.Item title='First' icon={{uri: base64Icon, scale: 3}} defaultTab>
          <TabOne />
        </TabBarNavigator.Item>
        <TabBarNavigator.Item title='Second' icon={{uri: base64Icon, scale: 3}}>
          <TabTwo/>
        </TabBarNavigator.Item>
      </TabBarNavigator>
    );
  }
}

var styles = StyleSheet.create({
    segmentControlContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    segmentControl: {
        width: 160
    }
});

React.AppRegistry.registerComponent('TabBarNavigatorExample', () => TabBarNavigatorExample);