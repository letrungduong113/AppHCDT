import { NavigationActions } from 'react-navigation';

var _navigator = null;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
    if (_navigator) {
        //console.log("----------Navigate without props------------")
        _navigator.dispatch(
            NavigationActions.navigate({
              routeName,
              params,
            })
          );
    }
  
}

function getNavigation() {
  return _navigator;
}

export default {
    navigate,
    setTopLevelNavigator,
    getNavigation,
  };