import { combineReducers } from "@reduxjs/toolkit";
import clientReducer from "./modules/client/slice";

const rootReducer = combineReducers({
  client: clientReducer,
});

export default rootReducer;
