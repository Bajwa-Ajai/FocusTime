import React from 'react';
import {Text , View , StyleSheet } from 'react-native';
import {RoundedButton} from '../../components/RoundedButton';


export const Timing=({onChangeTime})=>{
  return (
    <View>
    <View style={styles.timingButton}>
    <RoundedButton style={{marginHorizontal:10,marginTop:30}} size={60} title='10' onPress={()=>onChangeTime(10)} />
    <RoundedButton style={{marginHorizontal:10}} size={75} title='15' onPress={()=>onChangeTime(15)} />
    <RoundedButton style={{marginHorizontal:10,marginTop:30}} size={60} title='20' onPress={()=>onChangeTime(20)} />
    </View>
    </View>
  );
} 

const styles=StyleSheet.create({
  timingButton:{
    flex:1,
    flexDirection:'row',
    // alignItems:'center',
    justifyContent:'center',
  },
});

// const styles = Stylesheet.create({
//   timingButton:{
//     flex:1,
//     alignItems:'center',
//   },
// });