import React, {FC} from 'react';

import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
import {errorColor, textPrimaryColor,} from "../../assets/styles";
import {SetNameType} from "../../types/types";

type TProps = {
  setName: SetNameType
  setAddModalShown: (shown: boolean) => void
  handleDelete: () => void
  selectedIDs: Array<number>
  handleMoveForward: () => void
  handleMoveBack: () => void
  nextSetName: string
  prevSetName: string
}

const ActionButtons: FC<TProps> = ({setName, setAddModalShown,
                                     handleDelete, selectedIDs,
                                     handleMoveBack, handleMoveForward,
                                     nextSetName, prevSetName
                                   }) => {
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

  const showAlert = (title: string, message: string, confirmBtnText: string, confirmBtnAction: ()=>void) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: confirmBtnText,
          onPress: confirmBtnAction,
          style: "default" }
      ]
    )
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
      condition: true,
      onPress:  () => showAlert('Удаление',`Удалить отмеченные слова (${selectedIDs.length}) из набора?`, 'Удалить', handleDelete),
      disabled: !selectedIDs.length
    },
    {
      name: 'arrowright',
      type: 'antdesign',
      style: styles.moveForward,
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${nextSetName}"`, 'Переместить', handleMoveForward)
    },
    {
      name: 'arrowleft',
      type: 'antdesign',
      style: styles.moveBack,
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${prevSetName}"`, 'Переместить', handleMoveBack)
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
    bottom: 65
  },
  shuffleBtn: {
    bottom: 10,
  },
  deleteBtn: {
    bottom: 120
  },
  moveForward: {
    bottom: 175
  },
  moveBack: {
    bottom: 230
  }
})

export default ActionButtons;
