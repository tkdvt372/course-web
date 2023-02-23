import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer.js';
import { courseReducer } from './reducers/courseReducer.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    course:courseReducer,
    subscription:subscriptionReducer
  },
});

export default store;
export const server = 'https://course-web-dvt.herokuapp.com/api/v1';
