import React, { useState, useContext, useCallback } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native'
import {
  Text,
  IconButton,
  Divider,
  Caption,
  Chip,
  FAB,
  List,
} from 'react-native-paper'
import { withNavigationFocus } from 'react-navigation'
import SearchBar from '../../components/SearchBar'
import NavLink from '../../components/atomic/NavLink'
import NearByButton from '../../components/NearByButton'
import SearchHistory from '../../components/SearchHistory'
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as LocationContext } from '../../context/LocationContext'
import useLocation from '../../hooks/useLocation'

const SearchScreen = ({ navigation, isFocused }) => {
  const [trackLocation, setTrackLocation] = useState(false)
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext)

  const callback = useCallback(
    location => {
      console.log('The current geo location ===> ', location)
      addLocation(location, recording)
      // I'm currently not recording locations, never update the recording context state to true
      // So stop tracking before navigate off to another screen
      setTrackLocation(false)
      navigation.navigate('SearchResults', {
        searchTerm: '',
        searchMode: 'GEO_TARGET',
      })
    },
    [recording]
  )

  const [err] = useLocation(trackLocation, callback)
  const { state, addRecentSearch } = useContext(SearchContext)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchBarContainer}>
        <SearchBar
          onSubmit={searchTerm =>
            addRecentSearch(searchTerm, state.recentSearches)
          }
        />
        <NavLink routeName="mainBottomTabFlow" style={styles.cancelNavLink}>
          <Caption style={styles.cancel}>Cancel</Caption>
        </NavLink>
      </SafeAreaView>

      <Divider />

      {/* All the main search screen components should go here */}
      <ScrollView style={styles.titleContainer}>
        {/* Button to search nearby experiences go here - will trigger useLocation hook, might extract to own component if need to reuse later */}
        <NearByButton onPress={() => setTrackLocation(true)} err={err} />

        <Divider />
        {/* Recent search history goes here */}
        <SearchHistory />

        <Text style={styles.title}>This is the real search screen</Text>
      </ScrollView>

      {/* Chips for popular locations or main categories go here */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  cancelNavLink: {
    marginLeft: 5,
  },
  cancel: {
    fontSize: 16,
  },
  iconButton: {
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
    marginRight: 0,
    // position: 'absolute',
    // right: 0,
    // top: 20,
    // margin: 10
  },
  searchNearBy: {
    marginVertical: 20,
    alignItems: 'flex-start',
    // paddingLeft: 15
  },
  titleContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  title: {
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
  },
})

export default withNavigationFocus(SearchScreen)
