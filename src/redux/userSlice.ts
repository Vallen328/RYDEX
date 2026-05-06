import { IUser } from '@/models/user.model'
import { createSlice } from '@reduxjs/toolkit'

//Also our userData will be of type which we defined in user.model.ts that is export interface IUser extends Document
// Define a type for the slice state
interface IuserState {
  userData: IUser | null
}

// Define the initial state using that type
const initialState: IuserState = {
  userData: null
}


//createSlice is a function that has a name. 
//Then comes initialState, which is the initial state of the slice. So basically slice which we have, we keep data in a form of state. 
export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // reducers are basically one type of functions where we can use these functions to update our state. So whenever we want to update our state, we will use these reducers.
  // So let's make reducer simple sa and inside userData above which is currently null, we will put data inside it. 
  reducers: {
    setUserData: (state, action) => {    //Yeh state humari target karti hai upar likhe gaye initailState ko, aur action humari payload ko target karta hai, jisme humara data aayega.
        state.userData = action.payload   // now what does action do? Answer -> Wherever we use our reducers, data ko daalne ke liye, toh unn functions ke andar inn reducers ke andar data bhejte hai. Toh joh data hota hai na, uske andar hum bhejte hai. And these all we get from action.payload
    }
  },
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer