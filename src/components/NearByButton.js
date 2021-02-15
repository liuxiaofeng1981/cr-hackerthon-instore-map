import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Chip } from 'react-native-paper'

const NearByButton = ({ onPress, err }) => {
  return (
    <>
      <View style={styles.searchNearBy}>
        <Chip icon="map-marker-outline" mode="outlined" onPress={onPress}>
          Nearby
        </Chip>
      </View>
      {err && <Text>Please enable location services</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  searchNearBy: {
    marginVertical: 20,
    alignItems: 'flex-start',
  },
})

export default NearByButton
