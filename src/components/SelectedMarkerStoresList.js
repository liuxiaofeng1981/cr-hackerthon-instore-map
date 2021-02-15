import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native'
import { Text, Title, Caption } from 'react-native-paper'

const SelectedMarkerStoresList = ({ experiences, modalOpacity }) => {
  return (
    <Animated.View style={[styles.modal, { opacity: modalOpacity }]}>
      {experiences.length === 1 ? (
        <View style={[styles.content, styles.content__single]}>
          <Image
            style={styles.contentImage}
            source={{ uri: `${experiences[0].imageFilePath}` }}
          />
          <View style={styles.contentBody}>
            <Title style={styles.contentBody__title}>
              {experiences[0].name}
            </Title>
            <View style={styles.contentBody__price}>
              <Text>{experiences[0].percent}% cashback</Text>
            </View>
            <View>
              <Caption>{experiences[0].rating}/5 - Amazing!</Caption>
              <Caption style={{ fontSize: 11 }}>
                Pin shows in-store location
              </Caption>
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={experiences}
          renderItem={({ item }) => (
            <View style={[styles.content, styles.content__list]}>
              <Image
                style={styles.contentImage}
                source={{
                  uri: `${item.imageFilePath}`,
                }}
              />
              <View style={styles.contentBody}>
                <Title style={styles.contentBody__title}>{item.name}</Title>
                <View style={styles.contentBody__price}>
                  <Text>{experiences[0].percent}% cashback</Text>
                </View>
                <View>
                  <Caption>{item.rating}/5 - Amazing!</Caption>
                  <Caption style={{ fontSize: 11 }}>
                    Pin shows in-store location
                  </Caption>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
  },
  content: {
    backgroundColor: '#fff',
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 150,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 5,
  },
  content__single: {
    marginHorizontal: 10,
  },
  content__list: {
    marginHorizontal: 5,
    width: Dimensions.get('window').width * 0.88,
  },
  contentImage: {
    width: '35%',
    height: 150,
    borderRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  contentBody: {
    width: '65%',
    height: 150,
    marginVertical: 20,
    paddingVertical: 10,
    marginLeft: 0,
    paddingHorizontal: 10,
  },
  contentBody__title: {
    fontSize: 14,
    lineHeight: 15,
  },
  contentBody__price: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
})

export default SelectedMarkerStoresList
