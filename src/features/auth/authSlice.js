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





const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    setUsername: (state, action) => {
      const target = action.payload;
      state.email = target;
    },

    setpassword: (state, { payload }) => {
        state.password = payload;
    },

    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

// console.log(cartSlice);
export const { clearCart, setpassword, setUsername, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
