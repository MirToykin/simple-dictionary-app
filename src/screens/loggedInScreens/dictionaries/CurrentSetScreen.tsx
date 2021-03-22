import React from 'react';
import {StyleSheet, View} from "react-native";
import Set from "../../../components/dictionaries/Set";
import {setScreenStyles} from "../../../assets/styles";

const CurrentSetScreen = () => {
  return (
    <View style={setScreenStyles.title}>
      <Set setName={'current'}/>
    </View>
  );
};

export default CurrentSetScreen;
