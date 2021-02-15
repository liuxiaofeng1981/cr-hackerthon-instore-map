import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const StoresListHeader = ({ total, location }) => {
  let headerText =
    total > 0 ? `${total} stores` : 'Sorry, we could not find any match'
  if (location) {
    headerText = headerText + ` in ${location}`
  }

  return (
    <View style={styles.header}>
      <Text style={styles.header__text}>{headerText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  header__text: {
    fontStyle: 'italic',
  },
})

export default StoresListHeader
