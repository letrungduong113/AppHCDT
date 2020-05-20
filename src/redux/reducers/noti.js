
import type { Action } from '../actions/types';
import { UPDATE_NOTIFICATION, UPDATE_NOTIKHANCAP } from '../actions/noti';

export type State = {
  badge: int,
  check: Boolean,
}

const initialState = {
  badge: 0,
  check: false
};

export default function (state: State = initialState, action: Action): State {
  if (action.type === UPDATE_NOTIFICATION) {
    return {
      ...state,
      badge: action.badge,
    };
  }
  if (action.type === UPDATE_NOTIKHANCAP) {
    return {
      ...state,
      check: action.check,
    };
  }
  return state;
}
