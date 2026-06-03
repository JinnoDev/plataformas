import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import debounce from 'lodash.debounce';
import { searchApi } from '../services/api';
import { SearchResult } from '../types';
import Avatar from '../components/Avatar';

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const executeSearch = async (text: string) => {
    if (!text.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await searchApi.search(text);
      // Ajusta según responda exactamente tu API: response.data o response.data.data si está paginado
      setResults(Array.isArray(response.data) ? response.data : (response.data as any).data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Guardar la referencia del debounce para evitar recrearla en cada renderizado
  const debouncedSearch = useCallback(
    debounce((text: string) => executeSearch(text), 400),
    []
  );

  const handleInputChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar usuarios o publicaciones..."
          placeholderTextColor="#8E8E93"
          value={query}
          onChangeText={handleInputChange}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => `${item.type}-${item._id}`}
        renderItem={({ item }) => {
          if (item.type === 'user') {
            return (
              <TouchableOpacity 
                style={styles.userCard} 
                onPress={() => navigation.navigate('UserProfile', { userId: item._id })}
              >
                    {/* @ts-ignore */}
                <Avatar source= {(item.avatar || '')as any}name={item.name || item.username || ''} size={45} />

                <View style={styles.userMeta}>
                  <Text style={styles.username}>@{item.username}</Text>
                  {item.name ? <Text style={styles.name}>{item.name}</Text> : null}
                </View>
              </TouchableOpacity>
            );
          } else {
            // Renderizado de Post en los resultados de búsqueda
            return (
              <TouchableOpacity 
                style={styles.postCard} 
                onPress={() => navigation.navigate('PostDetail', { id: item._id })}
              >
                {item.mediaUrl ? <Image source={{ uri: item.mediaUrl }} style={styles.postImage} /> : null}
                <Text style={styles.postCaption} numberOfLines={2}>{item.caption}</Text>
              </TouchableOpacity>
            );
          }
        }}
        ListEmptyComponent={
          query.trim() && !loading ? (
            <Text style={styles.emptyText}>No se encontraron resultados.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  searchBarContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#262626' },
  input: { backgroundColor: '#1C1C1E', color: '#FFF', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, fontSize: 16 },
  userCard: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#262626' },
  userMeta: { marginLeft: 15 },
  username: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  name: { color: '#8E8E93', fontSize: 13 },
  postCard: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#262626' },
  postImage: { width: 50, height: 50, borderRadius: 4, marginRight: 15 },
  postCaption: { color: '#EAEAEA', flex: 1, fontSize: 14 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 40 }
});