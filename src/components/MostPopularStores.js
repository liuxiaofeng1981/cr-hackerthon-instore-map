import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text, Title } from 'react-native-paper'
import useSearchResults from '../hooks/useSearchResults'
import StoresList from './StoresList'

const MostPopularStores = () => {
  const searchTerm = 'VIC'
  const [
    searchKeywords,
    searchResults,
    errorMessage,
    loading,
  ] = useSearchResults(searchTerm)

  return (
    <View style={{ marginVertical: 10 }}>
      <Title style={styles.title}>Most Popular</Title>
      <StoresList
        experiences={searchResults ? searchResults.result.hits : null}
        // location={currentLocation ? currentLocation.geocode[0].city : null}
        loading={loading}
        direction="horizontal"
        titleLength={65}
        style={{
          marginTop: 10,
          borderWidth: 0,
          borderColor: 'white',
          marginHorizontal: 5,
          width: Dimensions.get('window').width * 0.78,
          height: 323,
          elevation: 3,
          padding: 10,
        }}
        coverStyle={{ height: 160 }}
        priceStyle={{
          flex: 'initial',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
  },
})

export default MostPopularStores
