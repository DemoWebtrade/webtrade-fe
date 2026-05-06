import { all } from "redux-saga/effects";
import { priceboardSaga } from "./modules/priceboard/saga";
import { socketSaga } from "./modules/socket/saga";

export default function* rootSaga() {
  yield all([priceboardSaga(), socketSaga()]);
}
