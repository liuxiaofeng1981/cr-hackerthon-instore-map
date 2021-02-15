import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import isEqual from 'lodash.isequal'

const StoreMapMarker = ({
  coord,
  fromPrice,
  selectedCoord,
  experienceCount,
}) => {
  return (
    <View
      style={[
        styles.marker,
        {
          backgroundColor: isEqual(coord, selectedCoord) ? '#694fad' : 'black',
        },
      ]}
    >
      <MaterialCommunityIcons
        name="storefront-outline"
        size={14}
        style={{ color: 'white', marginRight: 3 }}
      />
      <Text style={{ color: 'white' }}>
        {experienceCount > 1 && `${experienceCount} stores. cashback from `}
        {`${fromPrice}% cashback`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  marker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    borderColor: '#E63E31',
    borderWidth: 1,
  },
})

export default StoreMapMarker
