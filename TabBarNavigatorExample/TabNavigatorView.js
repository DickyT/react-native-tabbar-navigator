/**
 * react-native-tabbar-navigator sample app
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
  ActionSheetIOS,
  SegmentedControlIOS,
  Button
} from 'react-native';
import { TabNavigator } from 'react-native-tabbar-navigator';

const __STYLE = StyleSheet.create({
  flexEnabled: {
    flex: 1
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12
  },
  whiteColor: {
    color: '#ffffff'
  },
  segmentCtrlView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  segmentCtrl: {
    width: 160
  },
  view: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    color: '#007AFF',
    fontSize: 22,
    marginTop: -200
  },
  bodyStyle: {
    color: '#2B2B2B',
    backgroundColor: '#ffffff',
    padding: 15,
    marginTop: 50,
    marginBottom: 50
  }
});

const tabOneIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABU1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8mO/2mAAAAcHRSTlMAAQIDBAYHCAkKCwwNDg8QERIUFRcYGxweICIjJSgqLC0vMDEyNjc6PD5AQUJDREVGR05PVFVXWVthYmZnaGltcHN4fH+AgoiPkZSXmJqdnqKoq62wtbm8vsHDxcfOz9HV19rc4Obo6evt8fX3+fv9oZ9KRwAAAeFJREFUWMPt1NdT1FAYhvE3YRFWLAsWxIYoIkWlCHZQmiCoIIIFFFFAl/78/1deGJ1NOCV4Zrza7y7fOc9vZjczkapTnZxzGXbvhwBjwNcQYBMYCegbAVoCgAFgPwoAloDXuW8XFt/EmQ1ApySp9G3Y23+Cd2mhFaAoSaUyjPp7GE/tJoBVSYp+gEf43XMvtSwDj//+GU4h6Z+klk0AzZKkmvduwdhrENhNXqJbMPf6ALz88+ASLH0tQIf8gqXXDYA6eYXCsrnXFPC5cmEWrL22gYfyCfb+LMA5eQR7rwfAdnaZFQor1l4rwJTcgqs/BtAup+DqdROgVi4hWnb0mgY+Gk8SYVgnANgrGm9FO8CQ2e4CYE3qB+B7venSeYAzxr4NgHJJTuERsOXrXcIXYNLbS30WoR7gmr+3CrcACjl6qdcozAJL1v50amkSoj1g4FB/3dRLdwFYrxQuADTm7E3CU2Azdy/dyQprwJjpC2fuDwnHAa4coZdup4RugJqj9BlhDlgw/P6f9l7qAWBGkuJ9oL/yMD7w9olwVZIuApxKHU76e6kb2iRJz4CNzOELfy+1JB/xdeB59rC9qLxzEuCS/n16gYM4AHgLzAf0MUBPANAA0BAAqHlk9ZWqU53/Nb8AOJAKnq/8xU4AAAAASUVORK5CYII=';
const tabTwoIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAB5lBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ZIycPAAAAoXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhscHR8gISIjJCYnKCkqKywtLi8wMjM0NTY3OTo7PD0/QEJDREVGR0lKTE1PUFFSVFVWV1lbXF5fYWJjZGZnaGlrbG1wc3R1eXt8fn+AgoOFhouMjo+RkpSVl5udnqKlpqiqr7CytLW3ubq8vsDBw8XKzs/R09fZ2t7g4ubo6evt7/H19/n7/ZUDJF8AAAMaSURBVBgZtcGLW1NlAAfg3zkbu8gEnaOsBFLQJgKCZVEmecHyXtpMjZJuFGo3LZVQNC0xCkXQgbiNnd9/2s52zvd952zsfPQ8vS/qMkLhkIn/xHxlaOxBjjZr9trHO+JYjfDAOP1mMxugqeWyxZr+fsNAsNQEV5Z920B95tesb+ZF1NM+z0CfGFjRF9TxTxNqM8epJ7cJtUSnqcvqR7XIHFdhAH7mFFdlM3yuc3XySXicpWN+gfUUZgqseBqCYiMdj4H44AxrK4y8ALxJx0VIxkM6TsPWdpvV8kdCKInStRXCObpaUdGdte4M725PJmJrml7qOvrjIr9rQMUMHdkQHI0UGuEwTXhE4bpC1xk4LlMwEegzuopRlDVSakCgbyicQdkwpSYEukEhb6LEeE5pAEGMZUp9KOmk4gSCRJcp3UTJKKX7BgK9RUUYwBKltdBwjdJrQILSGHSkKJ0DeigloWWSwh/AhxQWoOcghWXgBwoXoaeFUhR3KXwEPTFKScxTGIQek1IrchQGocek1AGLwnHoiVBKI0fhU+hJUOrAPIUr0PMypVZMUXgGPQcppfAzpTi0/EIpirOUXocOI0fJwC5Kt6BjG6W/gCQVKWi4Q2kEMPKUbiJYmopeAD9RcQhB4otURAH0UfUu6ovPUfEAJaEiVSMm6kgvULUHtjGWZYssm92JlSSv0sNqgC1F2wFg4zTL5o41o1rDznH6fIWKCZY8WYfNGKUj92tmC6TY4W8fsdpaVLTQVtyL9qbrdBXiUHzPGkbhusSyfphGlo6TUMUsVilE4Ios0ZaPhXrbLFYk4DHBKvsg9bLsS6BvXZa2x/A6Sr9JqC7RVowgFTG2nM7sT8JnN32W4lAZ07QNA+hM42ronU54bafPq/CKP6WtBzYDVdL0OgC/5ue0nQ+jpjQ9MqiWXGTZxPBQ/66hD+CVpiqDWhJzlCbhtZ2KQ6gt/BuF2/DqopDrwIqOWXT8Dq9uuibXoI7191hxD17drMi9hwA9s7RNwauHNuvzMIJ1/UnyBrzaSC6dikBP84kLjfB5/8JWA/+HfwEojio6fUk+FAAAAABJRU5ErkJggg=='
const shareIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA2FBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lb+eLAAAAR3RSTlMAAQIEBQYHCAsMDxESExQVGhwdHyQmKiwtLzA0Njg5R1ZbXF9pb3N+f5GXmJqbnqCjqKqttbm6wMPH0dPV2dzk6e/x8/X3/T2VMTsAAAFbSURBVFjD7ZXZWsIwEIXTICKuNIiKiru4r7igUrWinvd/Iy9KWkgnaWNu/Pxy7jKd8+eUkgljXl4W6nJHAKLQEQC4hQDgFgKAW4gE4BACUr8NkQLUENCpv8V1fRMhNPbHpjaBEoK0v68bXkEJQflPplgRIAtB+LfHjbXWznHv5e0r3zYKkat/Lmfu+b0B9EpCqNXhYmpfvUeBujwH+G5Ie7OPYkVhClB+M36EMoqEBjDzXMo//goT/oW45PaMBszGZbenAZUo+ybXu+1GvcIDRm9PA05Hpdf9JYu/cta6khR6LcNhEvkHWWUAAHeh4SyQxzktrAGIO6aBIsgHaeEGeKhZjDQVUAXOAsNQFTqyXLdxbjfWVcDhU6C/WIRh2sr17Zzl1aYCDrSXqzDPe7muF1/vG+bPWKTqBZwAmx9wAUxf5nqtAJ0hnABXVK8NAH8bYCMP+H8ALy/G2A8xvHk9GDO2vgAAAABJRU5ErkJggg=='
const moreIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA7VBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9sDJFPAAAATnRSTlMAAQMEBQkMEBETGRodICEiIyUmLTAxNTY4O0JKS1ZYWVtdYmNmZ3FzdH+ChYmOj5GVmpueoK+wtLW3ur7Ax8jP0dfZ2tzg4uTv8fP19/tDFvODAAAA+ElEQVRYw+2T2VLCQBBFLwRBRTYFBRSURaMoIKsrogEXEun//xwfAqQnMUIVPvDQ563r3Jnqmu4BBEEQBOGfSdXH5qC65RURfWi9Xe16Rej06eujlbaLwC0REdH00B0r2IIu3CI+sUVPA4AGzUmqsfxClFWxM52LHoDYIkZGgMc0yzFh5YJ7R2SBa6eiPR7LMlHkIszEHWCw8pjndCY6XBwwQcA3q0o8d8PEIxc5fkFQ6eDEr4PuHx2s/QZsCqMVp/CgTAHN5XtQ8duDvrKJR36bqLtFwpyd1+x6v/Fuvpz/8he2L18toxb1itDZ8+SznYEgCIIgbBw/0r5ytCbnafQAAAAASUVORK5CYII=';
const settingsIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAbFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8+T+BWAAAAI3RSTlMAAgsSGyYrMUZHVWRmdHV+iI+RnabAwcXHyNHT2drv8fP3+fXCL1oAAACCSURBVFjD7Za3CsAwEEOd3ntxerH//x8zmAyBDOacLXqr0WE46RBj4F842bBPlUfWh1JREvWuvImfD9IMjgGSm29Bm8jQB4w5+XjMtYdIAg2CZtm6xKbKrVbZ9fSJA4o7MEL/D7hIX580yhZefSB8AyeuW5/aiCRAzUPNQ81DzfstFyjKk29ZOBvjAAAAAElFTkSuQmCC';
const dropDownIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA6lBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Le70HAAAATXRSTlMAAQMEBQYLDA4PEBESExQVFhclKCkqKy4vMjQ2Nzg5OjxBTl5hZGZnaWxvcXN1d3l7fI6bnqKlpqqrrbCytLnR1dna3N7g4unz9ff5+/iYwqsAAAERSURBVBgZ7cHXQsJAAATATbEHRbFi74JdI8QK0hSS/f/fEQtISLu7vGYGmUxmYPnadpRU7w4MACdMoa0DLtMoAA2mkQf2mcIb+ipU9jmJPqNBVSv4YblUc4g/RSq5x1CJCmo6/jmU1p3GCKNJWavwsVzKOcKYTUqxEVCmhLqOoEcK684ghNmiqDWEynkUc4wI2xTygEjnFFDXEe2JiXqziGG2mGQdseY9xjtFgh3GqiDRBWO8G0ikPTNSbw4CzDajbEDIgsdwZxC0y1BVCLtkiIYBYdoLA1wLEswOxxUhJe/RrwRJe/RxIO2KI5oGpGmvHHJzUDDR4cAWlCx6/FWGooLLbzdQNnXb+rCXkMlkkn0BMhSuRHcWyPUAAAAASUVORK5CYII=';


function NavItemText(props) {
  return (
    <TouchableOpacity style={__STYLE.navItem} {...props}>
      <Text style={__STYLE.whiteColor}>User</Text>
    </TouchableOpacity>
  );
}

function NavItemTextBack(props) {
  return (
    <TouchableOpacity style={__STYLE.navItem} {...props}>
      <Text style={__STYLE.whiteColor}>Back</Text>
    </TouchableOpacity>
  );
}

function NavItemIcon(props) {
  return (
    <TouchableOpacity style={__STYLE.navItem} {...props}>
      <Image style={{width: 20, height: 20}} source={{uri: moreIcon}}/>
    </TouchableOpacity>
  );
}

function NavItemIconSettings(props) {
  return (
    <TouchableOpacity style={__STYLE.navItem} {...props}>
      <Image style={{width: 20, height: 20}} source={{uri: settingsIcon}}/>
    </TouchableOpacity>
  );
}

function NavItemSegmentCtrl(props) {
  return (
    <View style={__STYLE.segmentCtrlView}>
      <SegmentedControlIOS
        style={__STYLE.segmentCtrl}
        values={['Shipped', 'All Orders']}
        tintColor='#ffffff'
        selectedIndex={1}/>
    </View>
  );
}

function TabOneIndex({ navigator, ...props }) {
  function onPress() {
    navigator.push({
      title: '#1 Next Page',
      component: (<TabOneDetail/>),
      navItems: {
        rightItem: {
          component: (<NavItemTextBack/>),
          onPress: (isRoot, pop) => {
            pop();
          }
        }
      }
    });
  }
  return (
    <View style={__STYLE.view} {...props}>
      <Text style={__STYLE.titleStyle}>
        react-native-tabbar-navigator
      </Text>
      <Text style={__STYLE.bodyStyle}>
        Customizing Top-Left and Top-Right navigation item.
      </Text>
      <Button
        title='Next Page'
        color='#FF4981'
        onPress={onPress}/>
    </View>
  );
}

function TabOneDetail({ navigator, ...props }) {
  function onPress() {
    navigator.pop();
  }
  return (
    <View style={__STYLE.view} {...props}>
      <Text style={__STYLE.titleStyle}>
        navigator.push(route)
      </Text>
      <Text style={__STYLE.bodyStyle}>
        Customizing Top-Right navigation item.
      </Text>
      <Button
        title='Go Back'
        color='#FF4981'
        onPress={onPress}/>
    </View>
  );
}

function TabTwoIndex({ navigator, ...props }) {
  function onPress() {
    navigator.push({
      title: 'Placeholder',
      component: (<TabTwoDetail/>),
      navItems: {
        leftItem: {
          component: (<NavItemTextBack/>),
          onPress: (isRoot, pop) => {
            ActionSheetIOS.showActionSheetWithOptions({
              options: ['navigator.pop()', 'Cancel'],
              destructiveButtonIndex: 1
            }, (idx) => {
              if (idx == 0) {
                navigator.pop();
              }
            });
          }
        }
      }
    });
  }
  return (
    <View style={__STYLE.view} {...props}>
      <Text style={__STYLE.titleStyle}>
        react-native-tabbar-navigator
      </Text>
      <Text style={__STYLE.bodyStyle}>
        Customizing Top-Right and Title navigation item.
      </Text>
      <Button
        title='Next Page'
        color='#FF4981'
        onPress={onPress}/>
    </View>
  );
}

function TabTwoDetailTitle(props) {
  return (
    <TouchableOpacity style={__STYLE.navItem} {...props}>
      <Text style={{color: '#ffffff'}}>Touch Here</Text>
      <Image style={{width: 10, height: 10}} source={{uri: dropDownIcon}}/>
    </TouchableOpacity>
  );
}

function TabTwoDetail({ navigator, ...props }) {
  function onPress() {
    navigator.pop();
  }
  function changeTitleElement() {
    // You could run this in componentDidMount or somewhere else
    let currentRouteStack = navigator.getCurrentRoutes();
    let currentRoute = currentRouteStack[currentRouteStack.length - 1];
    currentRoute.title = {
      component: (<TabTwoDetailTitle/>),
      onPress: () => {
        ActionSheetIOS.showActionSheetWithOptions({
          options: ['navigator.pop()', 'Cancel'],
          destructiveButtonIndex: 1
        }, (idx) => {
          if (idx == 0) {
            navigator.pop();
          }
        });
      }
    };
    navigator.replaceAtIndex(currentRoute, currentRouteStack.length - 1);
  }
  return (
    <View style={__STYLE.view} {...props}>
      <Text style={__STYLE.titleStyle}>
        navigator.push(route)
      </Text>
      <Text style={__STYLE.bodyStyle}>
        Customizing Top-Left and Title navigation item, assigning Title.onPress to THIS Component.
        You can run this inside `componentDidMount` for other purposes.
      </Text>
      <Text style={[__STYLE.bodyStyle, { marginTop: -10 }]}>
        Remember to wrap them inside a setTimeout(() => {}, 0) inside `componentDidMount`.
      </Text>
      <Button
        title='Change Title'
        color='#FF4981'
        onPress={changeTitleElement}/>
    </View>
  );
}

function TabNavigatorView() {
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
      <TabNavigator.Item title='Tab Two' icon={{uri: tabTwoIcon, scale: 3}} navItems={navItems[1]} badge='999+'>
        <TabTwoIndex/>
      </TabNavigator.Item>
    </TabNavigator>
  );
}

export default TabNavigatorView;
