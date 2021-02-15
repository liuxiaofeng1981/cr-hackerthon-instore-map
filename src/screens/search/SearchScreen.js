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
      <ScrollView style={styles.titleContainer}>
        <NearByButton onPress={() => setTrackLocation(true)} err={err} />

        <Divider />
        <SearchHistory />

        <Text style={styles.title}>This is the real search screen</Text>
      </ScrollView>
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
  },
  searchNearBy: {
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
  },
})

export default withNavigationFocus(SearchScreen)
