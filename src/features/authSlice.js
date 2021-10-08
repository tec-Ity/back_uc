import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetch_Prom, refreshToken_Prom } from '../js/api';
import { getRoleLinks } from '../js/conf/confUser';

const initialState = {
  accessToken: '',
  curUser: {},
  roleLinks: [],
  errMsg: '',
  status: 'idle',
};

export const reducerLogin = createAsyncThunk(
  'auth/reducerLogin', 
  async ({formdata},{rejectWithValue}) => {
    const login_res = await fetch_Prom('/login', 'POST', formdata);
    if(login_res.status === 200) {
      return login_res.data;
    } else {
      return rejectWithValue('my error info');
    }
} );
export const reducerRefreshToken = createAsyncThunk(
  'auth/reducerRefreshToken', 
  async (temp,{rejectWithValue}) => {
    const refresh_res = await refreshToken_Prom();
    if(refresh_res.status === 200) {
      return refresh_res.data; 
    }
     else { return rejectWithValue('my error info'); }
} );

const curUserObtSucceed = (state, action) => { 
  state.status = 'succeed';
  localStorage.setItem("accessToken", action.payload.accessToken);
  localStorage.setItem("refreshToken", action.payload.refreshToken);
  localStorage.setItem("role", action.payload.curUser?.role);
  state.accessToken  = action.payload.accessToken;
  state.curUser  = action.payload.curUser;
  state.roleLinks = getRoleLinks(action.payload.curUser.role);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reducerLogout: (state) => {
      state.curUser = {};
      state.accessToken = '';
      state.roleLinks = [];
      localStorage.removeItem("role");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name_curUser");
      localStorage.removeItem("role_curUser");
      localStorage.removeItem("crShop");
    }
   },
  extraReducers: {
    [reducerLogin.pending]: (state) => { state.status = 'loading'; },
    [reducerLogin.fulfilled]: curUserObtSucceed,
    [reducerLogin.rejected]: (state, action) => { state.status = 'Error'; state.errMsg = action.error.message; },
    
    [reducerRefreshToken.pending]: (state) => { state.status = 'loading'; },
    [reducerRefreshToken.fulfilled]: curUserObtSucceed,
    [reducerRefreshToken.rejected]: (state, action) => { state.status = 'Error'; state.errMsg = action.error.message; },
  }
});

export const selectToken = (state) => state.auth.accessToken;
export const selectUser = (state) => state.auth.curUser;
export const selectLinks = (state) => state.auth.roleLinks;

export const { reducerLogout } = authSlice.actions;

export default authSlice.reducer;
