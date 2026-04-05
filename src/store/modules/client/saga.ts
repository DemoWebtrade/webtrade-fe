// client/saga.ts

import { delay, put, takeLatest } from "redux-saga/effects";
import { setStartScroll } from "./slice";

function* handleSetScroll(action: ReturnType<typeof setStartScroll>) {
  yield delay(100);

  yield put(setStartScroll(action.payload));
}

export function* clientSaga() {
  yield takeLatest(setStartScroll.type, handleSetScroll);
}
