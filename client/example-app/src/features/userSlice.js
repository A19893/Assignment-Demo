import { createSlice } from "@reduxjs/toolkit";
import { addUser, getSessions, loginUsers, logoutUsers } from "./userSlice.action";
const initialState = {
  isLoading: false,
  loggedInState: false,
  users: {},
  message: "",
  type:"info",
  sessions: null,
  unauthorized: true
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUsers: (state, action) => {
      return action.payload;
    },
    removeUsers: (state, action) => {
      return null;
    },
    deleteMessage: (state, action )=>{
      state.message="";
      state.type="info"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading= false;
        state.loggedInState= true;
        state.unauthorized= false;
        state.users= action.payload;
        state.message = "User Created Successfully"
        state.type= "Success"
      })
      .addCase(addUser.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading= false;
        state.message = action.payload.error
        state.type= "Error"
      })
      .addCase(loginUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.isLoading=false;
        state.loggedInState= true;
        state.users= action.payload;
        state.unauthorized= false;
        state.message = "User Logged In  Successfully"
        state.type= "Success"
      })
      .addCase(loginUsers.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading= false;
        state.message = action.payload.error
        state.type= "Error"
      })
      .addCase(logoutUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUsers.fulfilled, (state, action) => {
        state.loggedInState = false;
        state.users= {};
        state.unauthorized= true;
        state.message = "User Logged Out Successfully"
        state.type= "Success"
      })
      .addCase(logoutUsers.rejected, (state, action) => {
        console.log(action.payload);
        state.message = action.payload.error
        state.type= "Error"
      })
      .addCase(getSessions.pending, (state,action)=>{
        state.isLoading = true;
      })
      .addCase(getSessions.rejected,(state,action)=>{
        state.isLoading=false;
        state.loggedInState= false;
        state.users={};
        state.unauthorized= true;
        state.message = "Your sessions is expired Please login again!"
        state.type= "Success"
      })
      .addCase(getSessions.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.sessions=action.payload;
      })
  },
});

export const { addUsers, removeUser, deleteMessage } = userSlice.actions;
export default userSlice.reducer;
