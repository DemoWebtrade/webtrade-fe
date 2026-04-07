import { combineReducers } from "@reduxjs/toolkit";
import priceboardReducer from "./modules/priceboard/slice";

const rootReducer = combineReducers({
  priceboard: priceboardReducer,
});

export default rootReducer;
