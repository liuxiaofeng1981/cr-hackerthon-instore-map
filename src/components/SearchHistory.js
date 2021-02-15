import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import {
  Text,
  Subheading,
  IconButton,
  List,
  Chip,
  Title,
} from 'react-native-paper'
import { Context as SearchContext } from '../context/SearchContext'

const SearchHistory = ({ recentSearches }) => {
  const { state, fetchRecentSearches, clearRecentSearches } = useContext(
    SearchContext
  )

  useEffect(() => {
    // fetch recent search history from device
    fetchRecentSearches()
  }, [])

  return (
    !!state.recentSearches.length && (
      <View style={styles.container}>
        <View style={styles.title}>
          <Subheading>Recent Searches</Subheading>
          <IconButton
            icon="trash-can-outline"
            size={18}
            onPress={clearRecentSearches}
            style={styles.iconButton}
          />
        </View>
        <View
          style={
            {
              // borderWidth: 1,
              // borderColor: 'green'
            }
          }
        >
          {state.recentSearches.map(searchItem => (
            <Chip
              key={searchItem.key}
              icon="history"
              mode="outlined"
              style={styles.searchItem}
              onPress={() => console.log('Do a history search!')}
            >
              {searchItem.text}
            </Chip>
          ))}
        </View>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  searchItem: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
})

export default SearchHistory
