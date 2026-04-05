import { all } from "redux-saga/effects";
import { clientSaga } from "./modules/client/saga";

export default function* rootSaga() {
  yield all([clientSaga()]);
}
