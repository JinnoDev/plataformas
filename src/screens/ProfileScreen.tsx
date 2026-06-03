import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta a tu AuthContext
import { usersApi, api} from '../services/api';
import { PostData } from '../types';
import Avatar from '../components/Avatar';
import {colors} from '../constants/colors';

const { width } = Dimensions.get('window');
const THUMBNAIL_SIZE = width / 3;

export default function ProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const response = await api.get<PostData[]>('/users/me/posts');    
      
      setPosts(response.data);
    } catch (error) {
      console.error("Error cargando posts del perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar publicaciones cada vez que el usuario regresa a la pestaña de perfil
  useFocusEffect(
    useCallback(() => {
      fetchMyPosts();
    }, [])
  );

  if (!user) return null;

  return (
    <View style={styles.container}>
      {/* Header del Perfil */}
      <View style={styles.header}>
        {/* @ts-ignore */}
        <Avatar source= {(user.avatar || '')as any}name={user.name || user.username} size={80} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}

        {/* Contadores */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{posts.length}</Text>
            <Text style={styles.statLabel}>Posteos</Text>
          </View>
          <TouchableOpacity 
            style={styles.statBox} 
            onPress={() => navigation.navigate('FollowList', { userId: user._id, type: 'followers' })}
          >
            <Text style={styles.statNumber}>{user.followersCount || 0}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statBox} 
            onPress={() => navigation.navigate('FollowList', { userId: user._id, type: 'following' })}
          >
            <Text style={styles.statNumber}>{user.followingCount || 0}</Text>
            <Text style={styles.statLabel}>Seguidos</Text>
          </TouchableOpacity>
        </View>

        {/* Botones de acción del Perfil */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.savedButton} onPress={() => navigation.navigate('SavedPosts')}>
            <Text style={styles.editButtonText}>🔖 Guardados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grid de Publicaciones */}
      {loading ? (
        <ActivityIndicator color={colors.primary || '#c9a84c'} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item._id })}>
              <Image source={{ uri: item.mediaUrl }} style={styles.thumbnail} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aún no tienes publicaciones.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#262626' },
  name: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  username: { color: '#8E8E93', fontSize: 14, marginBottom: 8 },
  bio: { color: '#EAEAEA', fontSize: 14, textAlign: 'center', marginHorizontal: 20, marginBottom: 15 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 10 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  statLabel: { color: '#8E8E93', fontSize: 12 },
  actionButtons: { flexDirection: 'row', marginTop: 15, width: '100%', gap: 10 },
  editButton: { flex: 2, backgroundColor: '#262626', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  savedButton: { flex: 1, backgroundColor: '#262626', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  editButtonText: { color: '#FFF', fontWeight: '600' },
  thumbnail: { width: THUMBNAIL_SIZE - 2, height: THUMBNAIL_SIZE - 2, margin: 1 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 40 },
});