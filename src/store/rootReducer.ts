import { combineReducers } from "@reduxjs/toolkit";
import priceboardReducer from "./modules/priceboard/slice";
import socketReducer from "./modules/socket/slice";

const rootReducer = combineReducers({
  priceboard: priceboardReducer,
  socket: socketReducer,
});

export default rootReducer;
