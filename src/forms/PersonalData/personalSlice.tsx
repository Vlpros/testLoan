import { createSlice } from '@reduxjs/toolkit'

export interface PersonalState {
  phone: string,
  name:string,
  surname:string,
  sex:string
}
const initialState: PersonalState = {
  phone: "",
    name:" ", 
    surname:" ",
    sex:" "
}
export const personalSlice = createSlice({
  name: 'counter',
  initialState, 
  reducers: {
    redname:(state, action) => {
      console.log(action.payload)
      state.name = action.payload.name
      state.phone = action.payload.phone
      state.surname =action.payload.surname 
      state.sex =action.payload.sex
    },
  
  }
})


export const { redname } = personalSlice.actions

export default personalSlice.reducer