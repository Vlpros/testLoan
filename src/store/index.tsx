import { configureStore } from '@reduxjs/toolkit'
import personalReducer from '../forms/PersonalData/personalSlice'
import addressReducer from '../forms/Address/addressSlice'

export default configureStore({
  reducer: {
    counter:personalReducer,
    address:addressReducer
  }
})