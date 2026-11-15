/**
 * API Service — Axios instance with JWT interceptor.
 * All API calls go through this configured instance.
 */
import axios from 'axios';

// Base API URL — FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eduverse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear session
      localStorage.removeItem('eduverse_token');
      localStorage.removeItem('eduverse_user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ───
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string; remember_me?: boolean }) =>
    api.post('/auth/login', data),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, new_password: string) =>
    api.post('/auth/reset-password', { token, new_password }),
  logout: () =>
    api.post('/auth/logout'),
};

// ─── Profile API ───
export const profileAPI = {
  get: () => api.get('/profile/'),
  update: (data: any) => api.put('/profile/', data),
};

// ─── Assessment API ───
export const assessmentAPI = {
  getQuestions: () => api.get('/assessment/questions'),
  submit: (answers: any[]) => api.post('/assessment/submit', { answers }),
  getResult: () => api.get('/assessment/result'),
};

// ─── Prediction API ───
export const predictionAPI = {
  getCareer: () => api.get('/prediction/career'),
  getPersona: () => api.get('/prediction/persona'),
  regenerate: () => api.post('/prediction/regenerate'),
};

// ─── Notifications API ───
export const notificationAPI = {
  getAll: () => api.get('/notifications/'),
  markAsRead: (id: string) => api.put(`/notifications/read/${id}`),
  markAllAsRead: () => api.put('/notifications/read-all'),
};

export default api;
