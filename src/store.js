import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import LoadingReducer from "src/reusable/LoadingSelector";

const initialState = {
  sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

export const Store = configureStore({
  reducer: {
    loading: LoadingReducer,
  },
});

const store = createStore(changeState)
export default store