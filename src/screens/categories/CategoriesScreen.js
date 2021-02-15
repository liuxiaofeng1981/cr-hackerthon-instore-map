import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Title, Subheading, Chip } from 'react-native-paper'
// import ReactiveSearchApp from '../../components/ReactiveSearchApp'

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ 
        // borderWidth: 1, 
        // borderColor: 'red', 
        paddingHorizontal: 20 
      }}>
        <Title style={{ fontSize: 26 }}>Categories Screen</Title>
        <View>
          {/*<Subheading style={{ fontSize: 16 }}>Haven't built yet!</Subheading>*/}
          <View style={styles.chipGroup}>
            <Chip mode="outlined" onPress={() => alert('I want rice')} style={styles.chip}>V8 Rice Cars</Chip>
            <Chip mode="outlined" onPress={() => alert('I like yoga')} style={styles.chip}>Home Yoga</Chip>
            <Chip mode="outlined" onPress={() => alert('I jump benchtop')} style={styles.chip}>Skydive the Benchtop</Chip>
            <Chip mode="outlined" onPress={() => alert('I need a tour')} style={styles.chip}>Bathroom Tour</Chip>
          </View>
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
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  chipGroup: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flexWrap: 'wrap'
  },
  chip: {
    marginTop: 5,
    marginRight: 5
  }
})

export default CategoriesScreen