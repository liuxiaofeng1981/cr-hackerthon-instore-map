import { NavigationActions } from 'react-navigation';

let navigator
// nav will be passed in from React Navigation
export const setNavigator = (nav) => {
  navigator = nav;
}

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({ routeName, params })
  )
}