import { combineReducers } from "redux";
// custom reducers
import { appReducer } from "./appReducer";
// combined reducers
const rootReducer = combineReducers({
  appReducer,
});
export default rootReducer;
