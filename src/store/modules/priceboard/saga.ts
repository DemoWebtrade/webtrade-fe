// client/saga.ts

import { delay, put, takeLatest } from "redux-saga/effects";
import { setExport, setStartScroll } from "./slice";

function* handleSetScroll(action: ReturnType<typeof setStartScroll>) {
  yield delay(100);

  yield put(setStartScroll(action.payload));
}

function* handleSetExport(action: ReturnType<typeof setExport>) {
  yield delay(100);

  yield put(setExport(action.payload));
}

export function* priceboardSaga() {
  yield takeLatest(setStartScroll.type, handleSetScroll);
  yield takeLatest(setExport.type, handleSetExport);
}
