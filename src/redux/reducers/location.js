
import type { Action } from '../actions/types';
import { UPDATE_LOCATION } from '../actions/location';

export type State = {
    location: {},
}

const initialState = {
  location: {
    latitude:21.159187,
    longitude:106.064988
  },
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === UPDATE_LOCATION) {
    return {
      ...state,
      location:action.location,
    };
  }




  return state;
}
