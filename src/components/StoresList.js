import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import { Text, Card, Title, Caption, Paragraph } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import truncate from 'lodash.truncate'
import StoresListHeader from './StoresListHeader'

const StoresList = ({
  experiences,
  location,
  loading,
  direction,
  style,
  coverStyle,
  priceStyle,
  titleLength,
}) => {
  return (
    <FlatList
      horizontal={direction === 'horizontal'}
      style={{
        flex: 1,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={experiences}
      renderItem={({ item: { _source } }) => (
        <Card style={[styles.card, style]}>
          <Card.Cover
            style={coverStyle}
            source={{
              uri: `${_source.imageFilePath}`,
            }}
          />
          <Card.Content style={styles.cardContent}>
            <Title
              style={[
                styles.cardTitle,
                { fontSize: direction === 'horizontal' ? 15 : 16 },
              ]}
            >
              {truncate(_source.name, { length: titleLength })}
            </Title>
            <View style={[styles.cardSubTitle, styles.cardSubTitle__location]}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={direction === 'horizontal' ? 14 : 17}
                style={styles.locationIcon}
              />
              <Caption
                style={[
                  styles.caption,
                  { fontSize: direction === 'horizontal' ? 13 : 14 },
                ]}
              >
                {_source.locationDisplay}
              </Caption>
            </View>
            <View style={[styles.cardSubTitle, styles.cardSubTitle__ratings]}>
              <MaterialCommunityIcons
                name="star"
                size={direction === 'horizontal' ? 14 : 16}
                style={styles.ratingIcon}
              />
              <Text style={styles.ratingScore}>{_source.operatorRating}</Text>
              <Caption
                style={styles.caption}
              >{`(${_source.numReviewsRated} reviews)`}</Caption>
              <Caption style={styles.bookingCount}> | 800+ Cashbacked</Caption>
            </View>
            <Paragraph>{_source.descriptionPreview}</Paragraph>
            <View style={[styles.cardBody__price, priceStyle]}>
              <Text style={styles.price}>{_source.percent}% cashback</Text>
            </View>
          </Card.Content>
        </Card>
      )}
      keyExtractor={({ _source }) => _source.name}
      ListHeaderComponent={
        loading ? (
          <View
            style={{
              paddingVertical: 20,
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          direction === 'vertical' &&
          experiences && (
            <StoresListHeader total={experiences.length} location={location} />
          )
        )
      }
    />
  )
}

StoresList.propTypes = {
  experiences: PropTypes.array,
  location: PropTypes.string,
  loading: PropTypes.bool,
  direction: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  coverStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  priceStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleLength: PropTypes.number,
}

StoresList.defaultProps = {
  location: null,
  direction: 'vertical',
  style: {},
  coverStyle: {},
  priceStyle: {},
  titleLength: 255,
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
  },
  card: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 20,
    elevation: 3,
  },
  cardContent: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  cardTitle: {
    lineHeight: 22,
    fontWeight: '600',
  },
  cardSubTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardSubTitle__location: {
    marginBottom: 0,
  },
  cardSubTitle__ratings: {
    marginBottom: 10,
  },
  caption: {
    marginLeft: 3,
    fontWeight: '600',
  },
  locationIcon: {
    color: 'grey',
  },
  ratingIcon: {
    color: '#E63E31',
  },
  ratingScore: {
    color: '#E63E31',
    fontWeight: '600',
  },
  cardBody__price: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 0,
  },
  bookingCount: {
    fontSize: 13,
  },
  priceWas: {
    textDecorationLine: 'line-through',
    fontSize: 13,
    color: 'grey',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
  },
  groupOptionCaption: {
    fontWeight: '500',
  },
})

export default StoresList
