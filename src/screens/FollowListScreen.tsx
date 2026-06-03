import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { usersApi } from '../services/api';
import { User } from '../types';
import Avatar from '../components/Avatar';

export default function FollowListScreen({ route, navigation }: any) {
  const { userId, type } = route.params; // type puede ser 'followers' o 'following'
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = type === 'followers' 
          ? await usersApi.getFollowers(userId) 
          : await usersApi.getFollowing(userId);
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [userId, type]);

  if (loading) return <View style={styles.center}><ActivityIndicator color="#c9a84c" size="large" /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.userItem} 
            onPress={() => navigation.navigate('UserProfile', { userId: item._id })}
          >
            {/* @ts-ignore */}
            <Avatar source= {(item.avatar || '')as any}name={item.name || item.username} size={45} />
            <View style={styles.meta}>
              <Text style={styles.username}>@{item.username}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay usuarios en esta lista.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  userItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#262626' },
  meta: { marginLeft: 15 },
  username: { color: '#FFF', fontWeight: 'bold' },
  name: { color: '#8E8E93', fontSize: 13 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 40 }
});