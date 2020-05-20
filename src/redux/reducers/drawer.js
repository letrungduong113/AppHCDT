
import type { Action } from '../actions/types';
import { OPEN_DRAWER, CLOSE_DRAWER, RECEIVE_NOTIFICATION } from '../actions/drawer';

export type State = {
    drawerState: string,
    drawerDisabled: boolean
}

const initialState = {
  drawerState: 'closed',
  drawerDisabled: true,
  badge: 0,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: 'opened',
    };
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: 'closed',
    };
  }

  if (action.type === RECEIVE_NOTIFICATION) {
    return {
      ...state,
      badge: state.badge + 1,
    };
  }

  return state;
}
