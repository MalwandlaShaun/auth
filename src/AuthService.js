import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

const AuthService = {
  register: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      console.log(response.data)
      return response.data.message;
    } catch (error) {
      console.error(error);
      throw new Error('Registration failed');
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => {
    const user = localStorage.getItem('user');
    return !!user; // Convert to boolean
  },
};

export default AuthService;
