import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const initialState = {
  email: "",
  password: "",
};

export const login = createAsyncThunk(
  'auth/',
  async (name, thunkAPI) => {
const navigate = useNavigate();

    try {
        const response = await axios.get('http://localhost:8000/users');
        const users = response.data;
    
        const matchedUser = users.find(
          (user) => user.email === initialState.email && user.password === initialState.password 
        );
    
        console.log(users)
        if (matchedUser) {
          
          alert('Login successful!');
          navigate('/dashboard');
        } else {
          alert('Invalid email or password');
        }
    
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);





const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   authSlice: (state, action) => {
      const target = action.payload;
      state.email = target;
    },

    setpassword: (state, action) => {
        state.password = action.payload;
    },

   
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

// console.log(authSlice);
export const { setpassword, setUsername } =
  authSlice.actions;

export default authSlice.reducer;
