import { configureStore } from '@reduxjs/toolkit';
import objectsReducer from './features/objectsSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    objects: objectsReducer,
    auth: authReducer,
  },
});
