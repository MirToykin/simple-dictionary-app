import React, {FC} from 'react';

import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {errorColor, primaryColor, textPrimaryColor, textSecondaryColor} from "../../assets/styles";
import {OptionsType, SetNameType} from "../../types/types";

type TProps = {
  setName: SetNameType
  setAddModalShown: (shown: boolean) => void
  handleDelete: () => void
  selectedIDs: Array<number>
}

const ActionButtons: FC<TProps> = ({setName, setAddModalShown, handleDelete, selectedIDs}) => {
  type TButton = {
    name: string,
    type: string,
    style: object,
    color: string,
    size: number,
    condition: boolean
    onPress: () => void
    disabled?: boolean
  }
  const buttons: Array<TButton> = [
    {
      name: 'plus',
      type: 'antdesign',
      style: styles.addBtn,
      color: textPrimaryColor,
      size: 30,
      condition: setName !== 'done',
      onPress: () => setAddModalShown(true)
    },
    {
      name: 'shuffle',
      type: 'ionicon',
      style: styles.shuffleBtn,
      color: textPrimaryColor,
      size: 30,
      condition: setName === 'current',
      onPress: () => {}
    },
    {
      name: 'delete',
      type: 'antdesign',
      style: styles.deleteBtn,
      color: errorColor,
      size: 30,
      condition: setName === 'current',
      onPress:  () => Alert.alert(
        "Удаление",
        'Удалить отмеченные слова из набора?',
        [
          {
            text: "Отмена",
            style: "cancel"
          },
          { text: "Удалить",
            onPress: handleDelete,
            style: "default" }
        ]
      ),
      disabled: !selectedIDs.length
    }
  ]

  const renderButton = (item: TButton) => {
    if (item.condition)
      return (
        <TouchableOpacity
          style={[styles.actionBtn, item.style]}
          onPress={item.onPress}
          key={item.name}
          disabled={item.disabled}
        >
          <Icon
            name={item.name}
            type={item.type}
            color={item.color}
            size={item.size}
          />
        </TouchableOpacity>
      )
  }

  return (
    <>
      {buttons.map(renderButton)}
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
    // backgroundColor: primaryColor,
    backgroundColor: 'transparent',
    bottom: 65
  },
  shuffleBtn: {
    bottom: 10,
    // backgroundColor: textSecondaryColor
    backgroundColor: 'transparent',
  },
  deleteBtn: {
    // backgroundColor: errorColor,
    backgroundColor: 'transparent',
    bottom: 120
  }
})

export default ActionButtons;
