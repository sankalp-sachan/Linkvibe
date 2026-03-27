import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api'}/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem('accessToken', resp.data.accessToken);
          localStorage.setItem('refreshToken', resp.data.refreshToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getPublicAssetUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  // If we're on a production-like site and the URL is localhost, fix it
  if (url.includes('linkvibe-backend.onrender.com') || !url.startsWith('http')) {
    const filename = url.split('/').pop();
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api').replace('/api', '');
    return `${baseUrl}/uploads/${filename}`;
  }
  return url;
};

export default api;
