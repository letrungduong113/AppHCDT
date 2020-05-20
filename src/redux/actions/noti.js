
import type { Action } from './types';


export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export const UPDATE_NOTIKHANCAP = 'UPDATE_NOTIKHANCAP';

export function updateNotification(badge): Action {
  return {
    type: UPDATE_NOTIFICATION,
    badge
  };
}


export function updateNotiKhanCap(check): Action {
  return {
    type: UPDATE_NOTIKHANCAP,
    check
  };
}