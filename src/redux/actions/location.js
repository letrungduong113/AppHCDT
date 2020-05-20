
import type { Action } from './types';


export const UPDATE_LOCATION = 'UPDATE_LOCATION';


export function updateLocation(location):Action {
  return {
    type: UPDATE_LOCATION,
    location
  };
}
