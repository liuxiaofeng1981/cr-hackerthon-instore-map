import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Button, Title, Subheading, Paragraph } from 'react-native-paper'

const GiftsScreen = ({ navigation }) => {
  const onSignout = async () => {
    try {
      alert('Clicked on signout!')
    } catch (error) {
      alert('Unable to sign out right now')
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          // borderWidth: 1,
          // borderColor: 'red',
          paddingHorizontal: 20,
        }}
      >
        <Title style={{ fontSize: 26 }}>Gifts Screen</Title>
        <View>
          <Subheading style={{ fontSize: 16 }}>Haven't built yet!</Subheading>
          <Paragraph>
            Sign out from firebase here to test device implicit login from Async
            Storage
          </Paragraph>
          <Button onPress={onSignout}>Signout</Button>
        </View>
      </SafeAreaView>

      {/* All the main home screen components should go here */}
      <View style={styles.titleContainer}>
        {/*<Text style={styles.title}>Let us shift the way you experience life!</Text>*/}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'blue',
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

export default GiftsScreen
