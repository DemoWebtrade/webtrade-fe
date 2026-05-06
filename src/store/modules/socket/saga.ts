// client/saga.ts

import { delay, put, takeLatest } from "redux-saga/effects";
import { setMarketStatus } from "./slice";

function* handleSetMarketStatus(action: ReturnType<typeof setMarketStatus>) {
  yield delay(100);

  yield put(setMarketStatus(action.payload));
}

export function* socketSaga() {
  yield takeLatest(setMarketStatus.type, handleSetMarketStatus);
}
