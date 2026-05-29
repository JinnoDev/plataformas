export interface User {
    _id: string;
    email: string;
    username: string;
    name: string;
    bio: string;
    avatar: string;
    followersCount: number;
    followingCount: number;
}

export interface PostData {
    _id: string;
    authorId: { _id: string; username: string; avatar: string } | string;
    caption: string;
    mediaUrl: string;
    likesCount: number;
    commentsCount: number;
    repostsCount: number;
    createdAt?: string;
    liked?: boolean;
    reposted?: boolean;
    saved?: boolean;
    isRepost?: boolean;
}

export interface Comment {
    _id: string;
    authorId: { _id: string; username: string; avatar: string };
    text: string;
    createdAt: string;
}

export interface Chat {
    _id: string;
    participants: User[];
    lastMessage?: Message;
    updatedAt: string;
}

export interface Message {
    _id: string;
    senderId: string;
    content: string;
    type: string;
    createdAt: string;
    read: boolean;
}

export interface Notification {
    _id: string;
    type: 'like' | 'comment' | 'follow' | 'repost';
    fromUser: { _id: string; username: string; avatar: string };
    post?: PostData;
    read: boolean;
    createdAt: string;
}

export interface SearchResult {
    type: 'user' | 'post';
    _id: string;
    username?: string;
    name?: string;
    avatar?: string;
    caption?: string;
    mediaUrl?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}