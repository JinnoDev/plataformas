import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { usersApi, api } from '../services/api';
import { User, PostData } from '../types';
import Avatar from '../components/Avatar';
import {colors}from '../constants/colors';

const { width } = Dimensions.get('window');
const THUMBNAIL_SIZE = width / 3;

export default function UserProfileScreen({ route, navigation }: any) {
  const { userId } = route.params;
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          api.get<User>(`/users/${userId}`),
          api.get<PostData[]>(`/users/${userId}/posts`)
        ]);
        setProfile(profileRes.data);
        setPosts(postsRes.data);
        
        // Asumiendo que el backend retorna una bandera o validándolo de tus datos locales
        // Si tu backend no expone un booleano `isFollowing` directo, puedes computarlo aquí.
        // Ej: setIsFollowing(profileRes.data.isFollowingMatch)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUserProfile();
  }, [userId]);

  const followToggleHandler = async () => {
    if (!profile) return;

    // Actualización visual optimista
    const previousState = isFollowing;
    const previousCount = profile.followersCount;

    setIsFollowing(!previousState);
    setProfile({
      ...profile,
      followersCount: previousState ? previousCount - 1 : previousCount + 1
    });

    try {
      if (previousState) {
        await api.delete(`/users/${userId}/follow`);
    } else {
        await api.post(`/users/${userId}/follow`);
      }
    } catch (err) {
      // Rollback en caso de error en el backend
      setIsFollowing(previousState);
      setProfile({ ...profile, followersCount: previousCount });
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator color="#c9a84c" size="large" /></View>;
  if (!profile) return <View style={styles.center}><Text style={{ color: '#FFF' }}>Usuario no encontrado.</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* @ts-ignore */}
        <Avatar uri={profile.avatar} name={profile.name || profile.username} size={80} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.username}>@{profile.username}</Text>
        {profile.bio ? <Text style={styles.bio}>{profile.bio}</Text> : null}

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{posts.length}</Text>
            <Text style={styles.statLabel}>Posteos</Text>
          </View>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('FollowList', { userId: profile._id, type: 'followers' })}>
            <Text style={styles.statNumber}>{profile.followersCount}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('FollowList', { userId: profile._id, type: 'following' })}>
            <Text style={styles.statNumber}>{profile.followingCount}</Text>
            <Text style={styles.statLabel}>Seguidos</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.followButton, isFollowing ? styles.unfollowButton : styles.followButtonActive]} 
          onPress={followToggleHandler}
        >
          <Text style={[styles.followButtonText, { color: isFollowing ? '#FFF' : '#000' }]}>
            {isFollowing ? 'Siguiendo' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item._id })}>
            <Image source={{ uri: item.mediaUrl }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Este usuario no tiene publicaciones.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#262626' },
  name: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  username: { color: '#8E8E93', fontSize: 14, marginBottom: 8 },
  bio: { color: '#EAEAEA', fontSize: 14, textAlign: 'center', marginHorizontal: 20, marginBottom: 15 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 10 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  statLabel: { color: '#8E8E93', fontSize: 12 },
  followButton: { marginTop: 15, width: '90%', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  followButtonActive: { backgroundColor: '#c9a84c' },
  unfollowButton: { backgroundColor: '#262626', borderWidth: 1, borderColor: '#555' },
  followButtonText: { fontWeight: 'bold', fontSize: 15 },
  thumbnail: { width: THUMBNAIL_SIZE - 2, height: THUMBNAIL_SIZE - 2, margin: 1 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 40 }
});