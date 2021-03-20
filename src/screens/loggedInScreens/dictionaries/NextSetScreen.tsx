import React from 'react';
import {StyleSheet, View} from "react-native";
import Set from "../../../components/dictionaries/Set";

const NextSetScreen = () => {
  return (
    <View style={styles.title}>
      <Set setName={'next'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: 'center'
  }
})

export default NextSetScreen;
