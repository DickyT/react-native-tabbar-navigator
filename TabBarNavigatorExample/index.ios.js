/**
 * react-native-tabbar-navigator sample app
 * https://github.com/DickyT/react-native-tabbar-navigator
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Button,
  Navigator
} from 'react-native';
import TabNavigatorView from './TabNavigatorView';

const __STYLE = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function TabBarNavigatorExample({ navigator }) {
  function onPress(name) {
    navigator.push({ name });
  }
  return (
    <View style={__STYLE.view}>
      <Button
        title='TabNavigator'
        color='#FF4981'
        onPress={() => onPress('TAB_NAVIGATOR')}/>
      <Button
        title='TabNavigator'
        color='#FF4981'
        onPress={() => onPress('TAB_NAVIGATOR_IOS')}/>
    </View>
  );
}

function TabBarNavigatorExampleNavigator() {
  function renderScene({ name }, navigator) {
    if (name == 'INDEX') {
      return (<TabBarNavigatorExample navigator={navigator}/>);
    }
    else if (name == 'TAB_NAVIGATOR') {
      return (<TabNavigatorView navigator={navigator}/>);
    }
  }
  function configureScene() {
    let config = Navigator.SceneConfigs.PushFromRight;
    config.gestures = {};
    return config;
  }
  return (
    <Navigator
      initialRoute={{name: 'INDEX'}}
      renderScene={renderScene}
      configureScene={configureScene}
      style={{flex: 1}}
    />
  );
}

AppRegistry.registerComponent('TabBarNavigatorExample', () => TabBarNavigatorExampleNavigator);
