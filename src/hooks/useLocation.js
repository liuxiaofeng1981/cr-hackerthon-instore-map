import { useState, useEffect } from 'react'
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)
  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        const { status } = await requestPermissionsAsync()
        console.log('permission status', status)
        if (status === 'granted') {
          subscriber = await watchPositionAsync(
            {
              accuracy: Accuracy.BestForNavigation,
              timeInterval: 1000,
              distanceInterval: 10, // 10 meters
            },
            callback
          )
        } else {
          throw new Error('Location permission not granted')
        }
      } catch (e) {
        console.log('Request location tracking permissions failed ===>', e)
        setErr(e)
      }
    }

    if (shouldTrack) {
      startWatching()
    } else {
      // stop watching
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }
    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]
}
