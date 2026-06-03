import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { usersApi, api} from '../services/api';
import { PostData } from '../types';

const { width } = Dimensions.get('window');
const THUMBNAIL_SIZE = width / 3;

export default function SavedPostsScreen({ navigation }: any) {
  const [savedPosts, setSavedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await api.get<PostData[]>('/users/me/saved');
        setSavedPosts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator color="#c9a84c" size="large" /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item._id })}>
            <Image source={{ uri: item.mediaUrl }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tienes publicaciones guardadas.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  thumbnail: { width: THUMBNAIL_SIZE - 2, height: THUMBNAIL_SIZE - 2, margin: 1 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 40 }
});