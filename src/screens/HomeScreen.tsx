import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PostCard from '../components/PostCard';
import { postsApi } from '../services/api';

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    try {
      const res = await postsApi.getFeed();
      setPosts(res.data?.posts || res.data || []);
    } catch (error) {
      console.log('Error cargando feed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (post: any) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                liked: !p.liked,
                likesCount: p.liked
                  ? p.likesCount - 1
                  : p.likesCount + 1,
              }
            : p
        )
      );

      if (post.liked) {
        await postsApi.unlikePost(post._id);
      } else {
        await postsApi.likePost(post._id);
      }
    } catch (error) {
      console.log('Error al dar like', error);
      loadFeed();
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onLike={() => handleLike(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});