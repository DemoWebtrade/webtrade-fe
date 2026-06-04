import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/slice";
import priceboardReducer from "./modules/priceboard/slice";
import socketReducer from "./modules/socket/slice";

const rootReducer = combineReducers({
  priceboard: priceboardReducer,
  socket: socketReducer,
  auth: authReducer,
});

export default rootReducer;
