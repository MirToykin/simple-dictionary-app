import React from 'react';
import {StyleSheet, View} from "react-native";
import Set from "../../../components/dictionaries/Set";
import {setScreenStyles} from "../../../assets/styles";

const NextSetScreen = () => {
  return (
    <View style={setScreenStyles.title}>
      <Set setName={'next'}/>
    </View>
  );
};

export default NextSetScreen;
