export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data?.detail || 'An error occurred.';
  }
  return error.message || 'Network error.';
};
