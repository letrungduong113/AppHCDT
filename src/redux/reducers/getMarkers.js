
import type { Action } from '../actions/types';
import { UPDATE_MARKERS } from '../actions/getMarkers';

export type State = {
    markers: Array,
}

const initialState = {
    markers: []
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === UPDATE_MARKERS) {
    return {
      ...state,
      markers: action.markers
    };
  }
  return state;
}
