import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/slice";
import orderReducer from "./modules/order/slice";
import priceboardReducer from "./modules/priceboard/slice";
import socketReducer from "./modules/socket/slice";

const rootReducer = combineReducers({
  priceboard: priceboardReducer,
  socket: socketReducer,
  auth: authReducer,
  order: orderReducer,
});

export default rootReducer;
