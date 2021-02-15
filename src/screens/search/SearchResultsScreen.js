import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import {
  Text,
  Button,
  IconButton,
  Divider,
  Chip,
  FAB,
  List,
  Card,
  Title,
  Headline,
  Subheading,
  Caption,
  Paragraph,
} from 'react-native-paper'
import SearchBar from '../../components/SearchBar'
import StoresList from '../../components/StoresList'
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as LocationContext } from '../../context/LocationContext'
import useSearchResults from '../../hooks/useSearchResults'
import {
  getExperiencesForMap,
  getExperiencesForMapAsObject,
} from '../../helpers'
import useDebug from '../../hooks/useDebug'

const SearchResultsScreen = ({ navigation }) => {
  const searchTerm = navigation.getParam('searchTerm')
  const searchMode = navigation.getParam('searchMode')
  console.log('On search results screen - searchMode ==> ', searchMode)

  const {
    state: { currentLocation },
  } = useContext(LocationContext)

  console.log('currentLocation on search results screen ==>', currentLocation)

  const searchBarIcon = { source: 'arrow-left', direction: 'auto' }
  const [
    searchKeywords,
    searchResults,
    errorMessage,
    loading,
  ] = useSearchResults(searchTerm, currentLocation)

  useDebug('SearchResultsScreen')

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchBarContainer}>
        {!!errorMessage && <Text>{errorMessage}</Text>}
        <SearchBar
          initialTerm={searchTerm}
          icon={searchBarIcon}
          onIconPress={() => navigation.navigate('Search')}
          onSubmit={newTerm => {
            // addRecentSearch(searchTerm, state.recentSearches)
            console.log('Go doing a real search now...', newTerm)
            searchKeywords(newTerm)
          }}
        />
      </SafeAreaView>
      <Divider />
      <View style={styles.titleContainer}>
        <Divider />
        <StoresList
          experiences={searchResults ? searchResults.result.hits : null}
          location={currentLocation ? currentLocation.geocode[0].city : null}
          loading={loading}
        />

        {searchResults && (
          <View style={styles.fab}>
            <Button
              icon="map-marker"
              mode="contained"
              color="#E63E31"
              style={[styles.fabAction, styles.fabAction__left]}
              onPress={() => {
                navigation.navigate('ExperiencesMap', {
                  experiences: getExperiencesForMapAsObject(
                    searchResults.result.hits
                  ),
                })
              }}
            >
              Map
            </Button>
            <Button
              icon="tune"
              mode="contained"
              color="#E63E31"
              style={[styles.fabAction, styles.fabAction__right]}
              onPress={() => console.log('Pressed filters')}
            >
              Filters
            </Button>
          </View>
        )}
      </View>
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
  iconButton: {
    marginRight: 0,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 6,
  },
  fab: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fabAction: {
    borderRadius: 20,
    width: 115,
    backgroundColor: '#E63E31',
  },
  fabAction__left: {
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderRightWidth: 1,
  },
  fabAction__right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
})

export default SearchResultsScreen
