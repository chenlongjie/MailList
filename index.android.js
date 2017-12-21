/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 import React, { Component } from 'react';
 import NewsList from './NewsList';
 import NewsLists from './NewsLists';
 import DetailView from './DetailView.android';
 import ListChild from './ListChild.js';
// var { NativeModules } = require('react-native');
// var aa= require(NativeModules);
// module.exports = React.ToastAndroid;

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  IntentAndroid,
  TouchableHighlight,
  ToastAndroid,
  MySceneComponent,
  TouchableOpacity,
} from  'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


var PropertyFinder = React.createClass({
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPress={() =>navigator.pop()}>
      <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
      </TouchableOpacity>
      </View>
      );
    },

    renderScene(route, navigator) {
      var routeId = route.id;
      if (routeId === 'NewsList') {
        return (
        <NewsList
        navigator={navigator} name={route.id} />
        );
      }else if(routeId === 'NewsLists'){
        return(
        <NewsLists
        navigator={navigator}  name={route.name}  type={route.type}/>
        );
      }else if(routeId === 'DetailView'){
        return(
        <DetailView
        navigator ={navigator}  name={route.name}  FWORKTEL ={route.FWORKTEL}
        names={route.names}
        MOBILE={route.MOBILE}/>
        );
      }
      else if(routeId === 'ListChild'){
        return(
        <ListChild
        navigator ={navigator}  name={route.name}  FWORKTEL ={route.FWORKTEL}
        names={route.names}
        MOBILE={route.MOBILE}/>
        );
      }

      return this.noRoute(navigator);
    },


    render: function() {
      console.log(   'key1 :'+this.props.key1);
      return (

      <Navigator
      initialRoute={{id: 'NewsList', name: 'Index',names: 'index',type : 'true',
    }}
    renderScene={this.renderScene}
    configureScene={(route) => {

      if (route.sceneConfig) {
        return route.sceneConfig;
      }
      return Navigator.SceneConfigs.FloatFromRight;
    }} />

    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
    <Text style={{color: 'white', margin: 10, fontSize: 16}}>
    登录
    </Text>
    </TouchableOpacity>
    );
  }
};


AppRegistry.registerComponent('MailList', () => PropertyFinder);

