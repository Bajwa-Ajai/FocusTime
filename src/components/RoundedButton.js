import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const RoundedButton =({ style = {}, textStyle = {}, size = 120, ...props }) => {
    return (
      <TouchableOpacity style={[styles(size).radius, style]}> 
    <Text 
        style={[styles(size).text, textStyle]} 
        onPress={props.onPress}>
            {props.title}
    </Text> 
</TouchableOpacity>
    );
  };

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      backgroundColor:'rgba(97,102,179,0.5)',
      width: size,
      height: size,
      borderColor:'#fff',
      borderWidth:2,
      alignItems: 'center',
      justifyContent:'center',
    },
    text: {
      color: '#fff',
      fontSize: size/3.5,
    },
  });

