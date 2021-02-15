import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

function getPosition(position) {
  switch (position) {
    case 'left':
      return { position: 'absolute', left: 20, bottom: 20 }
    default:
      return { position: 'absolute', right: 20, bottom: 20 }
  }
}

const CustomActionButton = ({ children, onPress, style, position, icon, iconSize, iconStyle }) => {
  const floatingActionButton = position ? getPosition(position) : []
  return (
    <TouchableOpacity style={floatingActionButton} onPress={onPress}>
      <View style={[styles.button, style]}>
        {!!icon && <MaterialCommunityIcons name={icon} size={iconSize} style={[styles.icon, iconStyle]} />}
        {children}
      </View>
    </TouchableOpacity>
  )
}

CustomActionButton.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

CustomActionButton.defaultProps = {
  style: {},
  iconStyle: {},
  icon: ''
}

export default CustomActionButton

const styles = StyleSheet.create({
  button: {
    width: 50,
    backgroundColor: 'transparent',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginRight: 5
  }
})
