import { all } from "redux-saga/effects";
import { priceboardSaga } from "./modules/priceboard/saga";

export default function* rootSaga() {
  yield all([priceboardSaga()]);
}
