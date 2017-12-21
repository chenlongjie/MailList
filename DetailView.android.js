/**
 * Created by Chenlongjie on 2017/2/21.
 */

 import React, { Component } from 'react'
 import {
   Linking,
   Image,
   PixelRatio,
   Dimensions,
   StyleSheet,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TouchableHighlight,
   ActivityIndicator,
   AsyncStorage,Platform
 } from 'react-native'


 let width =Dimensions.get('window').width
 let height =Dimensions.get('window').height
 let pixel =1 / PixelRatio.get()
 let items = ['姓名:', '部门：', '职务：',  '直线电话:',  '分机电话:',  '手机:', ]
 let componentsDOM = []
 let base64Sms = 'data:image/png;base64,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PqMd2OhG9IgIROC1MgiCALm55TcvvjH55Tsnl2Yb4Gtx77ergQ3plLuUL3o9zh1vRI+6CXfcaIcicfUoCBApaDJgy8gvF9+6/I2pL174yuSVGPgQLVpjq/cDavbs6qrXY264A2rQS7rjRhsV15IPy/OqAT4IArswm/vW1W9O//nZ125dbICPCtfGumyLgACguTOry9C45A4q4yScXa5xPJCCyF0Rfb8t6kWop4yCQrlSzS9MLn3tyr/N/sUP/n7yEoBKw9qC34qAxM+5i/n11RuFdxM7zKL2VZ8yatgxblPjR6+XtnUQoIhglIm8jsJa8fzs+7nXzv719b+79VZuqgX8hsK9nwhEBBgAivO1ys1vLryPBF8gn5bE4UGtdcYYhwxpIqrfNYWA6MUeGl4GERRpaGVglAGRlqAWciFfuJO7vfYPV781/Tf/+6dX/6cwV1ttpMyW4Otjb96i3b8B4ABwUX916nY9nugeO943PnZ04COZUf+EkzC7E17CN9oYUqSJ6K60qUtuERYb2jAsV8uVoBxey89U3pr6/uKpqXeWb63fKq+hXqhRwW4JfjsE4iR0CxEXgJvod5PpHX564Onu0aGD3R9IZJ3dJqFHlaP6lEYCANiizAEvh2U7U14Krs1fWHt38fzaTGG6UijnaqUG4Mgi4Bskww9DILquExEDwCGCUZ5ylFFGaSiqb6/u5iELswVzyCFXORBBGAPbCfiWq8P9vqmPSEREIjLxs8bGJ36IgeEGQBsDG8Z+iyvNbQN6kBYHGAFutdaxm5K9xaLlcYOaeNQE4v3j1ur5eASicwS0rZL4URNoN1acQGuLg31g0PH2/0Tuo+G9lM8FAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA5LTE3VDE1OjE5OjI5KzA4OjAwAyZnigAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMS0yMFQyMzozNDozNCswODowMCc8BO0AAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABd0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTZ5w5trAAAAFnRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADU2gWxb5gAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzg0OTYxNjc0M2Do6wAAABJ0RVh0VGh1bWI6OlNpemUANi40NEtCSlZU1AAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTEzMDAvMTEzMDAwMC5wbmfiGGWdAAAAAElFTkSuQmCC';
 let base64Phone = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH3QsUFyIhOG23AwAADGpJREFUaN69WWmMHMd1/l5V9TXn3rPL3ZWWEk+RMmXTpKiDkkw7AUwZIiQjMXI4N5DAQID8yZ8g/hHESIBAQOKc/qEARhwbCRLTChIaUhzLiSDH8CFSlHlJvPfgHrO7nJ2do6e7q15+zPSwdzS75JJUXuGhMZiuqu979epVvdeEexQiAjMDADEzAw0ADoCrAKqtt9IAtiL+j4gIACf63rWou+3opi341ZCMMQwAu58Zt/7w+GeHvYzVpyyZE5LSJGABABuERnM1CnW5XgmXdx0emzv/5lTQMgC5aYv9anh3BtxsB8uWFAYaABiA/OLxz27NDrofdR17b8pO7VFCbBWChomon5pLAQYazLxkDM9FxlytBbWzfiM4Uy7WT33ppeNXAWgAZNkSYaA3tSSbIkCCiA2TgpRf/LeXdmWHvGM5L/2sazn7pBCDFkkIEqD2wNyehlu/DBuErKGNKdbDxunVevXN1YX6q3987PiFCFqTIGZz5351pwQIAEklxBf+6mcHt+4b+qVMKv25rO3tVUK6kgBihgG3fJrBXSciEBEECEwEzUBktL8a1M9UatV/vnp64et/+7v/WdSRMS2+tyUib/uCJYgN08eff9j5zZePfGxiV+Hl/kzP5zO2u1URKWYDwxqmCb/VPigxLQbDwMCwAQFQQihXOVtc2z2ULXj7Pvb81kvVcmPxxsWbWloCbDbmsCEBx1MUNjR98lceTR39wmOfGSzk/7zXzT7hSOkyRzCs14F7Z8JgGDYADCyhHFvZ21VaPDXx0YFZYrp2+dR85HgKOjKbJ2A5kgJf0+HP7Ur/zG89+vO9vbkv9bq5bYpAEYdtS98fZRjWUCTIUe4gLBwc2ZVbDH198co7C6HlSJh19nZXAiSIdGTo0efGvc/83v4X+/pzf9Tr5B4UYEQtq98/8LfUMEOA4CinBxYeG96Vn12aWr00e7kUkaCuO6IbAQJDALB+48tHDhcKvX+Sd3PbBBiaow8N/K09YkBEsJXTQxZ2D+/pOfvWP12YWs9XuxEQAOTvfOVTWx/YMfSnPV72gCJAmwjreWISxL2KAcBsIImgpDUgHBqd2D/w/bdPXCl1m6aTAAGQh35ue/bg0R2/3ZfN/6IlhIw4gmFe12qaNRpRA9pEzatFIu7ftTuBIUlCSWvMyojVatV/e/rccthJQHRaXzlSHXhh2x4vbf+aJaUVmhCGkyEy2Qwio1ENqghChh9qVIIaorar3X0zbBCaEJaUlpdxfv3AsW17lC1VJ2bZQUZuf2IkdeilHb/fn+l5GjBCs25751rozWdoNDJWAQe3HMNw5mHMVq7Dj6qQQoK69twEiZaxLWml2Na4cbH0vcXr5SjhuWvYEADxzOd37/Q894gQpCKOYMDQ3ZQ1aqGPSGvsHngShcyDGM/vxv7hT0NRBpWg2rwyrNf/DtSAEXEEIUi5nvvJZ3511+4W5vYNQiXAEwAxMJH7dMryhjVrNK3fXYIogCPy8MM6Li6fRM4ZQM4ZwHh+JxiMk/OvI4hqsJV9H3Y2IWV7hf6xzFEA7yTwcrwCBEDsfHw4Y7nicSEoFZkImvkDapih2SAyBhP5j+DQ6Aso1mbxwxvfRslfBIHwQH4X9g0dgSVT0Gy6jrMZjVhDEKWUKw7seHI4k1yFJAE69Ms7truWN84w0MbAtAAnVTMjMga2zKDHLWA8vxNPjB7DYnW+SaJRBIMRsN/ajPeu2hgwDFzLG3viF3bsSKxAmwkBoNSQu8NSVr+GgUbzgta9aVjCgRIOAGBL7iE8Nf4ibtaLeHv+v3Bu6X9xqfRjBOzDxJe3e2i6hcZSVn9qyN2exBzvAQGAlCNHIJA1Leuv65IMRBwi4hAAgUAYzT2Ex0eP4kdzJ7DgX4Wg5llA9+V4A8gYQCCrHDkSuzwArZJshMIACKnYbzcS39TgR9X2wUMQyNi9sEQKq1EFlrwPm3et2QBCSij0d65A+wcLZA0MgdG65q5nDiDSPpb9OQRRHUrYYDBs6cISaVSDOjKOgCDxga7c6g8AtMnFMSAyhNQao695gY0w3PTZ5ip0V2MMQITp6iWUgkWACAxG2srjkf6DcCiPSqN1DnT0DU2IelBHPfARmmjDedbM2QoIzKyQOAfWhFEdmTCONAbra5zGrARFXCufQ6D9tn3Hc9uxv/AJwDioNKqIWLf7BSbEql9DFEo0Aka1UUdo9IZzteeMI5LWQQLz2rJKGOpyZEwkJdSd5NUMxnulkxj0xjGe3d4clQi7Bz8ODcYPZl5DqbaKlONBCgGtDYZTD+Op0aOoBmW8MflNVBqt/+k22S0xjOEoinSl2wowAGrUooVI6yozoxlKN1YDhq+rOFn8Hpbqc4hjDpHAnsEDeO6BF5FVBSxXylisLEMbwmOFp1FIj2GiZyeeG38RNuVQadSa7rTBXMyMUOuqX42KLQIMNC9zovWU258bHs4PZQ4rS+U1ayRLAxtpLVpFJVxBvzsCV6XBzCAQ+r0CRrMPgQ0ha/UhiAKsNJYwmNqClMqixxtAzu7HfHUaDVMDkeg6fnNlJfxGsDB/7ebx86/NXESzlmQkbsVUlS14ZuiR3Kc81x3R7dTxzlo5vIlKuIJeZwgpK9tOoDJ2Dg/17sb23r0Y8EZwtvgTzNUmUUiPIaUy6PMKAAEL/hQ0dNs1kw2tVV2prl4+9/r0V2+cXl4GEAHQMuFKcub0cmPPS2MHM5nMIwxDzYh0+xVohjiDUrCIlWAZOasPaSvbBgMQJAn0uH3o94bx0+JPMFubxEh6HESEq+VzKDZmWnlHN+sTwIKXlktvnfiDk/8KIEgSiGOqBCAffnYok+nznlRKeZtLTACGQTm4iYX6NBzhIW31QAoFArXfybt9GEqN4sLSKcz5k1j0b+Bi+TQiE4DRPX+QpNAIgtLC9dLXzv3H9GkAYYsAxyvQdiNBtDL4WO7ZtJcaMRyXqzaXmNd0BVPVyygHN+GpNARJCNw62FJWBlm3B++VTmLBn0LYupJ0G48gIElhaaV04dQ3rvxl8f1yqUVAAzBxGG2moYC+9Ob80q4Xxl7NpNOP2LZyjVk/J9hIfF3HhdIpXF09h5HUBIa9cWTsHgBAObiJ6col+KbW9vH1CmRSCNQC3y/NVL516X/mF2PgsYclCWgAUaMcBue/PfladsR7frC/73Eigt7oWrGhMOq6hivlc7hcPrvmHwIBtHFpVpIAM1BaKZ8+d2LytUY5bPs+EmH01pgtvXm9GhYezVdSg+7TtmV7cS3z7jLb7uWW9fw9bkQESQrVen155t3iyz9+5fI7JuJ60n26EQAAMhFT6Ua1OLA34zkZe7+lbKFZg1tR6RaA+1yZayMhKGGh3mjo+cnlr/7gb97/l8psYxXNTzxR0oWSBDhJolYMNCTPZB+wC07K3qmkBc3NE/HDqszF4KVQCMMQi3PLJ86+OvWVyTeXZlvgg6T1OwmsdVGAFs+vVp0ea9IZkVtsz55Q0qL4cvVhECBqRhyjDVaXq29ceH36y2e+PvV+AnyUBL8RgVjE7KlSyelRV+xBMeSk7Akllej07/thedECH4ahXphd/O7F78z8xalXrp1tgW8kfH/D0mKnMACaO1lahsR5e0goy7O22spyQALMtz5rbFbiXoSmywgI1P3G6sLU0jff//fZv/7p16bOA/Bb2hX87Qhw8rl4drVculJ51xtVRemKPqHEsKXsVi301uelO2oECCIooWKro7JSPT373uIrp/7u8j9ce2NxugP8mo27mRWICRgAqM4H/tXvLLwHz5whl5bYMkNSyqxSFimSRNQscjAByXQ+jvmCJKRQUEKBSHIYRKayWplcvL7yjxe/O/P3P/yzi/9dmQtKLZe5Lfjm2BtL+4oBwAJgo/np1M496OXHDvdNjB0cfCq7xT1ieWqb53iukkqRIElE1B6dAWZmNqwjHUX1Rt0P69Gl1Rv+G9M/Kn5/+q3la+Vr9RU0N2q8YW8L/k4IJEnIDiI2ANsbsFOZUTczuC+/pbA3/xGv39qmPLlFWKJPSHgAYDTqJjTLUV3fqC+Fl+bPrLxbPL1yozLjV+qLQa0FONYY+Jorw70QiN9bj4gCYBFBCUdYQgklJAR1lCTYsDEaxkQmMg0TMiNKgF0P+G2jw2a/1Mck2llci0DyGWd5lBg/edjqlkYdzxj4ba1+LwRiSQKMAXdq59gxgU6Nw+Oa28SHTSDZP6mdlk+uQPyMgXa9Sfx/E+g2VpJApyTB3pei6f8Bj5jy6m4tU/EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDktMTdUMTU6MTk6MjkrMDg6MDADJmeKAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTExLTIwVDIzOjM0OjMzKzA4OjAw4ps6YwAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNy4wLjEtNiBRMTYgeDg2XzY0IDIwMTYtMDktMTcgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfd2aVOAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA1NnnDm2sAAAAWdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTaBbFvmAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzODQ5NjE2NzOtBH1IAAAAEnRFWHRUaHVtYjo6U2l6ZQA2LjQ2S0JJ0oC6AAAAX3RFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3NpdGUvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTI5OS8xMTI5OTkyLnBuZ7JDA84AAAAASUVORK5CYII=';

 let _arr =[]
 export default class Manager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _arrList:[],
      loaded: false,
    }
  }

  componentWillMount() {

  }
  componentDidMount(){
   this.fetchData("http://192.168.3.234:8097/AddressBookQueryServlet?FID="+this.props.name+"&TYPE=false&ACTION=main");


 }
 _iteration( data){
           //  遍历数据   迭代
           data.map(function (item ){
            _arr.push(item.NAME,
              item.DEPT,
              item.FPost,
              item.FWORKTEL,
              item.FWorkCode,
              item.FMobilePone
              )
          });
         }

         _clear() {
          _arr=[];
          componentsDOM=[];
          this.props.navigator.pop()
        }
        fetchData(url) {
          console.log('url : '+url);
          fetch(url)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
              loaded: true,
              _arrList:this._iteration(responseData.LIST)
            });

          })
          .done();
        }
        _pushWidget(){
         let i=0;
         items.forEach(function (value) {
          if((i===3|i===5|i===4)&&(typeof(_arr[i])!="undefined")) {
            let url='sms: '+_arr[i];
            let urlTel='tel: '+_arr[i];
            componentsDOM.push(
              <TouchableOpacity style={styles.tag } key={value} >
              <View
              style={[styles.item, {flexDirection:'row'}]}>
              <Text
              style={[styles.fontBold,{flex:1}]}>{value}
              </Text>
              <Text
              style={[styles.font2]}>{_arr[i]}
              </Text>
              <TouchableHighlight style={{width:40}} underlayColor='#FFF8DC'
              onPress={  () =>  Linking.openURL(url).catch(err => console.error('An error occurred', err))}>
              <Image
              style={styles.icon}
              source={{uri: base64Sms, scale: 3}}
              />
              </TouchableHighlight>
              <TouchableHighlight onPress={
               () =>  Linking.canOpenURL(urlTel).then(supported => {
                if (!supported) {
                  console.log('Can\'t handle url: ' + urlTel);

                } else {
                  return Linking.openURL(urlTel);
                }
              }).catch(err => console.error('An error occurred', err))} >
               <Image
               style={styles.icon}
               source={{uri: base64Phone, scale: 3}}
               />

               </TouchableHighlight>
               </View>
               </TouchableOpacity>
               )}else{

             componentsDOM.push(
              <TouchableOpacity style={styles.tag } key={value} >
              <View
              style={[styles.item, {flexDirection:'row'}]}>
              <Text
              style={[styles.fontBold,{flex:1}]}>{value}
              </Text>
              <Text
              style={[styles.font,{flex:1}]}>{_arr[i]}
              </Text>

              </View>
              </TouchableOpacity>
              )

           }
           i++;
         });
       }
       renderLoadingView() {
         return (


           <View style={styles.container}>
           <Text>
           正在加载数据...
           </Text>
           </View>
           );
       }


       render (){
        let flowRight;
        if(Platform.OS === 'ios'){
          flowRight=styles.flowRightIOS;
        }else if(Platform.OS === 'android'){
          flowRight=styles.flowRightAndroid;
        }
        if (!this.state.loaded) {
          return this.renderLoadingView();

        }

        this._pushWidget();
        return (
          <ScrollView style={styles.container}>
          <View style={flowRight}>
          <Text
          style={styles.bookText}>通讯簿
          </Text>
          </View>
          <View style={styles.wrapper}>
          {componentsDOM}
          </View>
          <TouchableOpacity style={styles.quitWrapper}
          onPress={this._clear.bind(this)}>
          <View  style={styles.quitBox}>
          <Text underlayColor='#99d9f4' style={styles.quitFont}>返回</Text>
          </View>
          </TouchableOpacity>
          </ScrollView>
          )


        }
      }

      const styles = StyleSheet.create({
        container:{
          flex:1,
          backgroundColor:'#F5F5F5',
        },
        flowRightIOS: {
         paddingTop : 73,
         alignItems: 'center',
       },
       flowRightAndroid: {
         paddingTop : 10,
         alignItems: 'center',
       },
       item:{
        height:50,
        justifyContent: 'center',
        borderTopWidth: pixel,
        borderColor: '#48BBEC',
        backgroundColor:'#fff',
        alignItems:'center',paddingRight:10
      },
      fontBold:{
        fontSize:16,
        marginLeft:20,fontWeight:'bold',
      },
      font:{
        flex:1,
        fontSize:16,
        alignItems:'center',marginRight:35
      },
      font2:{
        flex:1,
        fontSize:16,
        flexDirection: 'row',
        marginLeft:39
      },
      wrapper:{
      },
      tag:{
       alignItems:'center',
       flex: 3,
       borderWidth: 0.2,
       borderBottomColor: '#48BBEC',
     },
     quitWrapper:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    quitBox:{
      marginTop:30,
      backgroundColor:'#48BBEC',
      height:56,
      width:width*0.9,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      borderRadius:3
    },
    quitFont:{
      fontSize:22,
      fontWeight:'500',
      color:'#fff'
    },
    bookText:{
      alignItems:'center',
      height: 36,
      flex: 1,
      fontSize: 18,
      borderRadius: 8,
      color: '#48BBEC'
    },
    icon:{
      width:36,
      height: 36,
    }
  })