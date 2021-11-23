import { configureStore } from '@reduxjs/toolkit';

import invoiceSlice from './invoice-slice';

const store = configureStore({
  reducer: { invoice: invoiceSlice.reducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch