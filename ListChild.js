/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
 'use strict';
 import React, { Component } from 'react';
 import{
   Image,
   ListView,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Navigator,
   NativeModules,
   TouchableHighlight,
   NavToolbar,
   ToolbarAndroid,
   TextInput,Platform
 } from 'react-native';
 var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
 var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
 var PAGE_SIZE = 25;
 var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
 var REQUEST_URL = API_URL + PARAMS;

 export default class ListChild extends React.Component{
   gotoPersonPage(id,type,analogData){
     console.log("TYPE+++"+type);
     if(type===false){
       this.props.navigator.push(
       {
         id: 'DetailView',
         name : id,
         names: analogData.NAME,
       });
     }else{
       this.props.navigator.replace({
         id: 'ListChild',
         name : id,
         names: analogData.NAME,
       })
     //  this.fetchData("/AddressBookQueryServlet?FID="+id+"&TYPE=true&ACTION=main")
   }

    //  console.log("1111111111111111111"+this.props.navigator.id);
  }
  constructor(props){
   super(props);
   this.state = {
     dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    }),
     loaded: false,
     text:'',
     flag:true,
     reqList:null,
   };
 }

 componentDidMount() {
   this.fetchData("http://192.168.3.234:8097/AddressBookQueryServlet?FID="+this.props.name+"&TYPE=true&ACTION=main");
 }
 reached(){
  //this.fetchData("/AddressBookQueryServlet?FID=1&TYPE=true");
  console.log("加载更多");
}

fetchData(url) {//获取响应数据LIST:{}
console.log('url : '+url);
fetch(url)
.then((response) => response.json())
.then((responseData) => {
 this.setState({
  dataSource: this.state.dataSource.cloneWithRows(responseData.LIST),
           //dataSource: this.state.dataSource.cloneWithRows(this.superposition(  AnalogData.organization)),
           reqList:responseData.LIST,
           loaded: true,
         });
})
.done();
}
searchData(url,name){
 fetch(url)
 .then((response) => response.json())
 .then((responseData) => {
   this.setState({
    dataSource: this.state.dataSource.cloneWithRows(this.superposition(responseData.LIST,name)),
    loaded: true,
  });
 })
 .done();
}
superposition( data,name){
   //  遍历数据   迭代
   var _arr =[];
   data.map(function (item ){
     if(item.NAME.indexOf(name) != -1){
      _arr.push({
       "NAME": item.NAME,
       "ID":item.ID,
       "TYPE":item.TYPE
     })
    }
  });
   return _arr;
 }
 onPressed_btn(data){
   data=this.state.text;
   if(typeof(data)=="undefined"){
     data="";
   };
   if(data.replace(/\s/g, "")===""){
    this.fetchData("http://192.168.3.234:8097/AddressBookQueryServlet?FID=1&TYPE=true&ACTION=main");
  }else{
   this.searchData("http://192.168.3.234:8097/AddressBookQueryServlet?FID=2&TYPE=true&ACTION=search",data);
 }
}

render() {
 let searchBtnStyle,backBtnStyle,outer;
 if(Platform.OS === 'ios'){
  searchBtnStyle=styles.searchBtnIos;
  backBtnStyle=styles.backBtnIos;
  outer=styles.outerIOS;
}else if(Platform.OS === 'android'){
  searchBtnStyle=styles.searchBtnAndroid;
  backBtnStyle=styles.backBtnAndroid;
  outer=styles.outerAndroid;
}
return(
 <View style={outer}>
 <View style={styles.flowRight}>
 <TouchableHighlight style={backBtnStyle}
 onPress={() =>this.props.navigator.pop() }
 underlayColor='#99d9f4'>
 <Text style={styles.backText}>后退</Text>
 </TouchableHighlight>
 <TextInput
 style={styles.searchInput}
 onChangeText={(text) => this.setState({text})}
 value={this.state.text}
 placeholder=' 输入员工姓名'/>
 <TouchableHighlight onPress={() =>this.onPressed_btn(this.state.text)}
 style={searchBtnStyle}
 underlayColor='#99d9f4'>
 <Text style={styles.buttonText}>搜索</Text>
 </TouchableHighlight>
 </View>
 <View >
 <ListView
 dataSource={this.state.dataSource}
 renderRow={(rowData) => this.renderMovie(rowData)}//RN封装好的Listview每行都调用一次的的方法
 onEndReachedThreshold={10}
 />

 </View>
 </View>

 );

}

  // 设置 列表里的视图
  renderMovie(analogData) {
    // console.log("analogData  "+ analogData.TYPE)

    return (
     <View style={styles.container}>
     <TouchableHighlight  style={styles.btn} underlayColor='#99d9f4' onPress={
      () => this.gotoPersonPage(analogData.ID,analogData.TYPE,analogData) }>
      <Text style={{ fontSize: 17, marginBottom: 6, textAlign: 'center',  padding :0}}>{analogData.NAME}</Text>
      </TouchableHighlight>
      </View>
      );
    }
    renderLoadingView() {
      return(
      <View style={styles.container}>
      <Text>
      正在加载中...
      </Text>
      </View>
      )
    }
  };
  const styles = StyleSheet.create({
   outerIOS:
   {backgroundColor :'#ffffff',flex:1,position: 'relative',paddingTop:73},
   outerAndroid:
   {backgroundColor :'#ffffff',flex:1,position: 'relative',paddingTop:10},
   row: {
     flexDirection: 'row',
     justifyContent: 'center',
     padding: 3,
     paddingLeft: 5,
     // backgroundColor: '#F6F6F6',
     backgroundColor: '#F6F6F6',
   },
   listView:{
     flex: 1,
   },
   container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
     padding: 3,

   },
   rightContainer: {
     flex: 1,
   },
   title: {
     fontSize: 20,
     marginBottom: 8,
     textAlign: 'center',
   },
   year: {
     textAlign: 'center',
   },
   flowRight: {
     paddingLeft : 10,
     paddingRight : 10,
     flexDirection: 'row',
     alignItems: 'center',
     alignSelf: 'stretch'
   },
   buttonText: {
     fontSize: 18,
     color: 'white',
     alignSelf: 'center'
   },
   btn:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top :0
  },
  btnChild:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'blue',
    borderWidth: 0.3,
  },
  searchBtnAndroid: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchBtnIos: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  backBtnAndroid: {
   height: 36,
   width:58,
   flexDirection: 'row',
   justifyContent: 'center',
   backgroundColor: '#FF0000',
   borderColor: 'red',
   borderRadius: 8,
   marginRight:8,
   marginLeft:8,
   alignSelf: 'stretch',
   alignItems:'center'
 },
 backBtnIos: {
   height: 36,
   width:58,
   flexDirection: 'row',
   justifyContent: 'center',
   backgroundColor: '#FF0000',
   borderColor: 'red',
   borderRadius: 8,
   marginRight:8,
   marginLeft:8,
   alignSelf: 'stretch',
   alignItems:'center'
 },
 backText: {
   fontSize: 18,
   color: 'white',
 },
 searchInput: {
   height: 36,
   padding: 4,
   marginRight: 5,
   flex: 4,
   fontSize: 18,
   borderWidth: 1,
   borderColor: '#48BBEC',
   borderRadius: 8,
   color: '#48BBEC'
 },
});

module.exports = ListChild;

