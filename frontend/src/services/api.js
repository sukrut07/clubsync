import axios from 'axios';

const API = axios.create({
    baseURL: "https://clubsync-8js9.onrender.com/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach JWT token if available
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('clubsync_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('clubsync_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API service methods
export const testAPI = () => API.get('/test');
export const authAPI = {
    register: (data) => API.post('/auth/signup', data),
    login: (data) => API.post('/auth/login', data),
};
export const usersAPI = {
    getAll: () => API.get('/users'),
    getById: (id) => API.get(`/users/${id}`),
};
export const clubsAPI = {
    getAll: () => API.get('/clubs'),
    getById: (id) => API.get(`/clubs/${id}`),
};
export const clubAPI = clubsAPI;
export const eventsAPI = {
    create: (data) => API.post('/events/create', data),
    getAll: () => API.get('/events/all'),
    getByClub: (club) => API.get(`/events/club/${club}`),
    getById: (id) => API.get(`/events/${id}`),
    update: (id, data) => API.put(`/events/${id}`, data),
    delete: (id) => API.delete(`/events/${id}`)
};

export const registrationAPI = {
    register: (data) => API.post('/registration', data),
    getMy: () => API.get('/registration/my'),
    cancel: (id) => API.delete(`/registration/${id}`),
};

export const participationAPI = {
    mark: (data) => API.post('/participation/mark', data),
    getLeaderboard: () => API.get('/participation/leaderboard'),
    getMy: () => API.get('/participation/my'),
};

export const announcementAPI = {
    create: (data) => API.post('/announcements', data),
    getAll: () => API.get('/announcements'),
    delete: (id) => API.delete(`/announcements/${id}`),
};

export const taskAPI = {
    create: (data) => API.post('/tasks', data),
    getMy: () => API.get('/tasks/my'),
    submit: (id, data) => API.put(`/tasks/${id}/submit`, data),
    approve: (id) => API.put(`/tasks/${id}/approve`),
};

export const recruitmentAPI = {
    create: (data) => API.post('/recruitment', data),
    getAll: () => API.get('/recruitment'),
    scheduleInterview: (data) => API.post('/recruitment/interview', data),
};

export default API;
