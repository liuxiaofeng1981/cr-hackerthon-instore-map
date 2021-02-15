import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const NavLink = ({ navigation, children, routeName, style }) => (
  <TouchableOpacity
    style={style}
    onPress={() => navigation.navigate(routeName)}
  >
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({})

export default withNavigation(NavLink)
