import api from './api';

export const getContests = (params) => api.get('/contests', { params });
export const getUpcomingContests = () => api.get('/contests/upcoming');
export const getContestsByPlatform = (platformId) => api.get(`/contests/platform/${platformId}`);
export const getContestById = (id) => api.get(`/contests/${id}`);

export const addBookmark = (contestId) => api.post('/bookmarks', { contestId });
export const removeBookmark = (id) => api.delete(`/bookmarks/${id}`);
export const getBookmarks = () => api.get('/bookmarks');

export const setReminder = (contestId, offsetMinutes) => api.post('/reminders', { contestId, offsetMinutes });
export const getReminders = () => api.get('/reminders');

export const getDashboardStats = () => api.get('/dashboard');
