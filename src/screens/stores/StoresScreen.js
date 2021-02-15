import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native'
import {
  Text,
  Title,
  Caption,
  FAB,
  List,
  TouchableRipple,
  Divider,
  Banner,
  Paragraph,
  Surface,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SearchBar from '../../components/SearchBar'
import MostPopularStores from '../../components/MostPopularStores'

const StoresScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* The fake searchbar goes here */}
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate('searchFlow')}>
          <Surface style={styles.searchBox}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              style={styles.searchIcon}
            />
            <Caption style={styles.caption}>Search cashbacks</Caption>
          </Surface>
        </TouchableOpacity>
      </SafeAreaView>
      {/* All the main home screen components should go here */}
      <ScrollView
        style={styles.titleContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* TODO: extract banner into a component */}
        <Surface style={{ marginTop: 2, marginBottom: 20, elevation: 2 }}>
          <Banner
            visible
            actions={[
              {
                label: 'Learn more',
                onPress: () => alert('Please stay at home!'),
              },
            ]}
            icon={({ size }) => (
              <Image
                source={{
                  uri: 'https://source.unsplash.com/Rv_UID0uyMM/400x300',
                }}
                style={{
                  width: size,
                  height: size,
                }}
              />
            )}
          >
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              Every transaction starts with Cashrewards{' '}
            </Text>
            <Paragraph>
              - shop with Cashrewards to get insane cashbacks!
            </Paragraph>
          </Banner>
        </Surface>

        <MostPopularStores />
        <View style={{ marginTop: 20 }}>
          <ImageBackground
            source={{
              uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdgG_qrB_HkHKGsKCiOpS_LJ2ot-rJBBhRQ&usqp=CAU`,
            }}
            style={{
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: 180,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: '500',
                marginTop: 10,
              }}
            >
              Proudly supporting Starlight Children
            </Text>
          </ImageBackground>
        </View>
      </ScrollView>
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
  searchBox: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 2,
    elevation: 2,
    marginHorizontal: 15,
  },
  searchIcon: {
    color: 'grey',
    paddingHorizontal: 10,
  },
  caption: {
    fontSize: 18,
    marginLeft: 5,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
})

export default StoresScreen
