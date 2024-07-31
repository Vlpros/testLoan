import { createSlice } from '@reduxjs/toolkit'

export interface AdressState {
  job: string,
  address:string,
  
}
const initialState: AdressState = {
    job: "",
    address: "",
   
}
export const addressSlice = createSlice({
  name: 'address',
  initialState, 
  reducers: {
    redaddress:(state, action) => {
      console.log(action.payload)
      state.job = action.payload.job
      state.address = action.payload.address
    
    },
  
  }
})


export const {  redaddress } = addressSlice.actions

export default addressSlice.reducer