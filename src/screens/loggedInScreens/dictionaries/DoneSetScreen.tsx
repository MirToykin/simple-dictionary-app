import React from 'react';
import {StyleSheet, View} from "react-native";
import Set from "../../../components/dictionaries/Set";
import {setScreenStyles} from "../../../assets/styles";

const DoneSetScreen = () => {
  return (
    <View style={setScreenStyles.title}>
      <Set setName={'done'}/>
    </View>
  );
};

export default DoneSetScreen;
