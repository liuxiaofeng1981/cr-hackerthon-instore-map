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
  // console.log('On search results screen - searchTerm ==> ', searchTerm)
  console.log('On search results screen - searchMode ==> ', searchMode)

  // Also get current location from context - app state
  const {
    state: { currentLocation },
  } = useContext(LocationContext)

  console.log('currentLocation on search results screen ==>', currentLocation)

  const searchBarIcon = { source: 'arrow-left', direction: 'auto' }

  // useSearchResults hook should be done on this screen
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
        {/*<IconButton
          icon='arrow-left'
          size={20}
          // color='white'
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        />*/}
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
        {/*<NavLink text="Cancel" routeName="mainBottomTabFlow" style={styles.cancel} />*/}
      </SafeAreaView>

      <Divider />

      {/* All the main search results screen components should go here */}
      <View style={styles.titleContainer}>
        <Divider />

        {/* TODO: add facility to reset/update geo location, as the first time used NearBy button, it sets that location into context */}

        {/* Add this search result list to a separate component */}
        <StoresList
          experiences={searchResults ? searchResults.result.hits : null}
          location={currentLocation ? currentLocation.geocode[0].city : null}
          loading={loading}
        />

        {/* Add a Floating Button for Map, Filters, Sort etc, this needs to use aggs from searchResults */}
        {searchResults && (
          <View style={styles.fab}>
            <Button
              icon="map-marker"
              mode="contained"
              color="#E63E31"
              style={[styles.fabAction, styles.fabAction__left]}
              onPress={() => {
                // navigation.navigate('ExperiencesMap', { experiences: getExperiencesForMap(searchResults.result.hits) })

                const start = Date.now()
                console.log(
                  'Experiences Map Object =====>',
                  getExperiencesForMapAsObject(searchResults.result.hits)
                )
                console.log('Time:', Date.now() - start)
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
            {/*<FAB
            small
            icon='map-marker'
            label='Map'
            style={[styles.fabAction, styles.fabAction__left]}
            onPress={() =>
              // navigation.navigate('AddNotes', {
              //   addNote
              // })
              console.log('Pressed me')
            }
          />
          <FAB
            small
            icon='tune'
            label='Filters'
            style={[styles.fabAction, styles.fabAction__right]}
            onPress={() =>
              // navigation.navigate('AddNotes', {
              //   addNote
              // })
              console.log('Pressed me')
            }
          />*/}
          </View>
        )}

        {/*<Text style={styles.title}>This is the search results screen</Text>*/}
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
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  iconButton: {
    // backgroundColor: 'rgba(211, 211, 211, 0.8)',
    marginRight: 0,
    // position: 'absolute',
    // right: 0,
    // top: 20,
    // margin: 10
  },
  titleContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 6,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  fab: {
    position: 'absolute',
    // borderWidth: 1,
    // borderColor: 'blue',
    bottom: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fabAction: {
    // height: 45,
    borderRadius: 20,
    width: 115,
    backgroundColor: '#E63E31',
  },
  fabAction__left: {
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderRightWidth: 1,
    // borderRightColor: ''
  },
  fabAction__right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
})

export default SearchResultsScreen
