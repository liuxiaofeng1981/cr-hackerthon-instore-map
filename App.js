import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'
import { setNavigator } from './src/navigation/navigationRef'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as SearchProvider } from './src/context/SearchContext'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E63E31',
    accent: '#eee',
  },
}

export default () => (
  <LocationProvider>
    <SearchProvider>
      <PaperProvider theme={theme}>
        <AppNavigator
          ref={navigator => {
            setNavigator(navigator)
          }}
        />
      </PaperProvider>
    </SearchProvider>
  </LocationProvider>
)
