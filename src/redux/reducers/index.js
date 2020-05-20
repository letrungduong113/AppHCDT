import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import drawer from "./drawer";
import user from "./user";
import list from "./list";
import noti from "./noti";
import user1 from "./user1";
import location from "./location";
import getMarkers from "./getMarkers";
export default combineReducers({
  form: formReducer,
  drawer,
  user,
  list,
  noti,
  getMarkers,
  location,
  user1
});
