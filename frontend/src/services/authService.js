import api from './api';


export const login = async (email, password) => {
  // FastAPI expects username and password fields (OAuth2PasswordRequestForm)
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  const response = await api.post('/auth/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};


export const register = async (data) => {
  // FastAPI expects /auth/signup for registration
  const response = await api.post('/auth/signup', data);
  return response.data;
};


// Remove refreshToken if not supported by backend
