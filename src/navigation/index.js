import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import StoresScreen from '../screens/stores/StoresScreen'
import DestinationsScreen from '../screens/destinations/DestinationsScreen'
import CategoriesScreen from '../screens/categories/CategoriesScreen'
import GiftsScreen from '../screens/gifts/GiftsScreen'
import SearchScreen from '../screens/search/SearchScreen'
import SearchResultsScreen from '../screens/search/SearchResultsScreen'
import StoresMapScreen from '../screens/stores/StoresMapScreen'

const searchResultsStackNavigator = createStackNavigator(
  {
    SearchResults: {
      screen: SearchResultsScreen,
    },
    ExperiencesMap: {
      screen: StoresMapScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const searchSwitchNavigator = createSwitchNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      gestureEnabled: false,
    },
  },
  searchResultsFlow: {
    screen: searchResultsStackNavigator,
  },
})

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Stores: {
      screen: StoresScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <MaterialCommunityIcons
            name="storefront"
            size={25}
            color={focused ? '#FFF' : '#DACE91'}
          />
        ),
      },
    },
    Destinations: {
      screen: DestinationsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="map-marker"
            size={25}
            color={focused ? '#FFF' : '#DACE91'}
          />
        ),
      },
    },
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="view-dashboard"
            size={25}
            color={focused ? '#FFF' : '#DACE91'}
          />
        ),
      },
    },
    Gifts: {
      screen: GiftsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="wallet-giftcard"
            size={25}
            color={focused ? '#FFF' : '#DACE91'}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Stores',
    shifting: true,
    labeled: true,
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
)

const appStackNavigator = createStackNavigator(
  {
    mainBottomTabFlow: {
      screen: bottomTabNavigator,
    },
    searchFlow: {
      screen: searchSwitchNavigator,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default createAppContainer(appStackNavigator)
