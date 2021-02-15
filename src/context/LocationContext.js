import { reverseGeocodeAsync } from 'expo-location'
import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload }
    case 'START_RECORDING':
      return { ...state, recording: true }
    case 'STOP_RECORDING':
      return { ...state, recording: false }
    case 'ADD_LOCATION':
      return { ...state, locations: [...state.locations, action.payload] }
    case 'SET_TRACK_NAME':
      return { ...state, trackName: action.payload }
    default:
      return state
  }
}

const startRecording = dispatch => () => {
  dispatch({
    type: 'START_RECORDING',
  })
}

const stopRecording = dispatch => () => {
  dispatch({
    type: 'STOP_RECORDING',
  })
}

const addLocation = dispatch => async (location, recording) => {
  console.log("Hi there, I'm tracking!")
  const geocode = await reverseGeocodeAsync(location.coords)
  const geoLocation = { location, geocode }
  dispatch({
    type: 'SET_CURRENT_LOCATION',
    payload: geoLocation,
  })
  if (recording) {
    dispatch({
      type: 'ADD_LOCATION',
      payload: location,
    })
  }
}

const setTrackName = dispatch => trackName => {
  dispatch({
    type: 'SET_TRACK_NAME',
    payload: trackName,
  })
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    setTrackName,
  },
  {
    recording: false,
    locations: [],
    currentLocation: null,
    trackName: '',
  }
)
