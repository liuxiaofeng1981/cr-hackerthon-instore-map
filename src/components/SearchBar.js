import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Text, Searchbar } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'

const SearchBar = ({
  navigation,
  initialTerm,
  icon,
  onIconPress,
  onSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm)

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search in-store cashbacks"
        onChangeText={searchTerm => setSearchTerm(searchTerm)}
        value={searchTerm}
        onIconPress={onIconPress}
        icon={icon}
        onEndEditing={() => onSubmit(searchTerm)}
        style={styles.searchbar}
      />
    </View>
  )
}

SearchBar.propTypes = {
  initialTerm: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onIconPress: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  initialTerm: '',
  onIconPress: () => {},
  icon: 'magnify',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 4,
    // elevation: 0
  },
})

export default withNavigation(SearchBar)
