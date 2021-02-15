import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Button,
  Animated,
} from 'react-native'
import {
  Text,
  IconButton,
  Title,
  Snackbar,
  Card,
  Caption,
} from 'react-native-paper'
import Modal from 'react-native-modal'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapView, { Marker, Polyline, Circle, Callout } from 'react-native-maps'
import { Context as LocationContext } from '../../context/LocationContext'
import StoreMapMarker from '../../components/StoreMapMarker'
import SelectedMarkerStoresList from '../../components/SelectedMarkerStoresList'
import useDebug from '../../hooks/useDebug'

const StoresMapScreen = ({ navigation }) => {
  const experiences = navigation.getParam('experiences')
  const modalInitialOpacity = new Animated.Value(0)
  const [modalOpacity, setModalOpacity] = useState(modalInitialOpacity)
  const [selectedCoord, setSelectedCoord] = useState(null)

  const {
    state: { currentLocation },
  } = useContext(LocationContext)

  const _startModalAnimationIn = () => {
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  const onMapPress = e => {
    console.log('Pressed somewhere on the map! event data ===>', e.nativeEvent)
    const { action } = e.nativeEvent
    // Reset selected marker's experiences overlay
    if (!action || action !== 'marker-press') {
      setModalOpacity(modalInitialOpacity)
      setSelectedCoord(null)
    }
  }

  const onMarkerPressAtMapLevel = e => {
    console.log(
      'Pressed a marker on the map at MapView level! event data ===>',
      e.nativeEvent
    )
  }

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      forceInset={{ top: 'always' }}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          ...currentLocation.location.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={onMapPress}
        onMarkerPress={onMarkerPressAtMapLevel}
      >
        <Circle
          center={currentLocation.location.coords}
          radius={50}
          strokeColor="rgba(158,158,255,1.0)"
          fillColor="rgba(158,158,255,0.3)" // 1 is solid, .xx means apply a bit of opacity
        />
        {Object.keys(experiences).map(coord => {
          const coordObject = JSON.parse(coord)
          return (
            <Marker
              key={coord}
              coordinate={coordObject}
              onPress={e => {
                console.log(
                  `Pressed ${coordObject} at marker level`,
                  e.nativeEvent
                )
                setSelectedCoord(coordObject)
                _startModalAnimationIn()
              }}
            >
              <StoreMapMarker
                coord={coordObject}
                fromPrice={experiences[coord][0].percent}
                experienceCount={experiences[coord].length}
                selectedCoord={selectedCoord}
              />
            </Marker>
          )
        })}
      </MapView>
      {selectedCoord && (
        <SelectedMarkerStoresList
          experiences={experiences[JSON.stringify(selectedCoord)]}
          modalOpacity={modalOpacity}
        />
      )}
      <IconButton
        icon="close"
        size={24}
        color="grey"
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  closeButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 20,
    backgroundColor: '#e5e5e5',
  },
})

export default StoresMapScreen
