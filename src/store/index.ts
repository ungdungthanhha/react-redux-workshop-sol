import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import expensesReducer from './slices/expensesSlice'
import uiReducer from './slices/uiSlice'
import filtersReducer from './slices/filtersSlice'
import { STORAGE_KEY } from '../constants'

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    // TODO: Replace filters and ui with createSlice reducers after hands-on #3
    filters: filtersReducer,
    ui: uiReducer
  },
})

let hydrated = false

store.subscribe(() => {
  const items = store.getState().expenses.items
  if (!hydrated) {
    if (items.length === 0) return
    hydrated = true
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
