import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import productsApi from '../api/elasticsearch'
import { navigate } from '../navigation/navigationRef'

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECENT_SEARCHES':
      return { ...state, recentSearches: action.payload }
    case 'ADD_RECENT_SEARCH':
      return {
        ...state,
        recentSearches: [...state.recentSearches, action.payload],
      }
    case 'CLEAR_RECENT_SEARCHES':
      return { ...state, recentSearches: [] }

    default:
      return state
  }
}

const fetchRecentSearches = dispatch => async () => {
  const recentSearches = await AsyncStorage.getItem('adr_r_searches')
  const recentSearchesDeserialized = JSON.parse(recentSearches)
  console.log('AsyncStorage recent searches ===> ', recentSearchesDeserialized)
  if (recentSearchesDeserialized) {
    dispatch({
      type: 'SET_RECENT_SEARCHES',
      payload: recentSearchesDeserialized,
    })
  }
}

const addRecentSearch = dispatch => async (searchTerm, recentSearches) => {
  if (searchTerm.trim().length) {
    const newSearch = { key: recentSearches.length + 1, text: searchTerm }
    const updatedRecentSearchesSerialized = JSON.stringify([
      ...recentSearches,
      newSearch,
    ])
    await AsyncStorage.setItem(
      'adr_r_searches',
      updatedRecentSearchesSerialized
    )
    dispatch({
      type: 'ADD_RECENT_SEARCH',
      payload: newSearch,
    })
    navigate('SearchResults', { searchTerm })
  }
}

const clearRecentSearches = dispatch => async () => {
  await AsyncStorage.removeItem('adr_r_searches')
  dispatch({ type: 'CLEAR_RECENT_SEARCHES' })
}
const getSearchResults = dispatch => async searchTerm => {
  try {
    await AsyncStorage.setItem('adr_r_searches', [])
  } catch (error) {
    console.log('Search went wrong! ', error)
  }
}

export const { Context, Provider } = createDataContext(
  searchReducer,
  {
    addRecentSearch,
    clearRecentSearches,
    fetchRecentSearches,
    getSearchResults,
  },
  {
    recentSearches: [],
  }
)
