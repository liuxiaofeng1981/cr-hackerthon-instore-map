import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Title, Subheading } from 'react-native-paper'

const DestinationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Title style={{ fontSize: 26 }}>Destinations Screen</Title>
        <View>
          <Subheading style={{ fontSize: 16 }}>Haven't built yet!</Subheading>
        </View>
      </SafeAreaView>
      <View style={styles.titleContainer}></View>
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
})

export default DestinationsScreen
