import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostData, User } from '@/types';

const API_URL = 'http://localhost:3000/api/v1';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.response?.status === 401) {
            await AsyncStorage.removeItem('accessToken');
        }
        return Promise.reject(err);
    }
);

export const authApi = {
    register: (data: { email: string; username: string; password: string }) => api.post('/auth/register', data),
    login: (data: { email: string; password: string }) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
};



export const postsApi = {
    getFeed: (page = 1, limit = 10) => api.get(`/posts/feed?page=${page}&limit=${limit}`),
    getExplorePosts: (page = 1, limit = 30) => api.get(`/posts/explore?page=${page}&limit=${limit}`),
    getPostsByUser: (userId: string, page = 1) => api.get(`/users/${userId}/posts?page=${page}&limit=30`),
    getMyPosts: (page = 1) => api.get(`/users/me/posts?page=${page}&limit=30`),
    createPost: (formData: FormData) => api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    deletePost: (postId: string) => api.delete(`/posts/${postId}`),
    likePost: (postId: string) => api.post(`/posts/${postId}/like`),
    unlikePost: (postId: string) => api.delete(`/posts/${postId}/like`),
    repost: (postId: string) => api.post(`/posts/${postId}/repost`),
    savePost: (postId: string) => api.post(`/posts/${postId}/save`),
    unsavePost: (postId: string) => api.delete(`/posts/${postId}/save`),
};

export const commentsApi = {
    getComments: (postId: string, page = 1) => api.get(`/posts/${postId}/comments?page=${page}&limit=50`),
    createComment: (postId: string, text: string) => api.post(`/posts/${postId}/comments`, { text }),
    deleteComment: (commentId: string) => api.delete(`/comments/${commentId}`),
};

export const searchApi = {
    search: (q: string, page = 1) => api.get(`/search?q=${encodeURIComponent(q)}&page=${page}`),
};

export const uploadAvatar = (uri: string) => {
    const fd = new FormData();
    fd.append('avatar', { uri, name: 'avatar.jpg', type: 'image/jpeg' } as any);
    return api.post('/users/me/avatar', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const usersApi = {

    getMePosts: () => api.get<PostData[]>('/users/me/posts'),
    updateProfile: (data: { name?: string; bio?: string }) => api.patch<User>('/users/me', data),
    getUserProfile: (id: string) => api.get<User>(`/users/${id}`),
    getUserPosts: (id: string) => api.get<PostData[]>(`/users/${id}/posts`),
    followUser: (id: string) => api.post(`/users/${id}/follow`),
    unfollowUser: (id: string) => api.delete(`/users/${id}/follow`),
    getFollowers: (id: string) => api.get<User[]>(`/users/${id}/followers`),
    getFollowing: (id: string) => api.get<User[]>(`/users/${id}/following`),
    getSavedPosts: () => api.get<PostData[]>('/users/me/saved')
};

