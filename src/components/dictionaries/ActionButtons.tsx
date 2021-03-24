import React, {FC} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import {primaryColor, textPrimaryColor, textSecondaryColor} from "../../assets/styles";
import {SetNameType} from "../../types/types";

type TProps = {
  setName: SetNameType
  setAddModalShown: (shown: boolean) => void
}

const ActionButtons: FC<TProps> = ({setName, setAddModalShown}) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.actionBtn, styles.shuffleBtn]}
      >
        <Icon
          name='shuffle'
          type='ionicon'
          color={textPrimaryColor}
          size={30}
        />
      </TouchableOpacity>
      {setName !== 'done' && <TouchableOpacity
          style={[styles.actionBtn, styles.addBtn]}
          onPress={() => setAddModalShown(true)}
      >
          <Icon
              name='plus'
              type='antdesign'
              color={textPrimaryColor}
              size={35}
          />
      </TouchableOpacity>}
    </>
  );
};

const styles = StyleSheet.create({
  actionBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    position: "absolute",
    right: 20,
    justifyContent: "space-evenly"
  },
  addBtn: {
    backgroundColor: primaryColor,
    bottom: 75
  },
  shuffleBtn: {
    bottom: 20,
    backgroundColor: textSecondaryColor
  }
})

export default ActionButtons;
