import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { authApi } from "../services/api";
import { useNavigation } from "@react-navigation/native";

const numColumns = 2;
const size = Dimensions.get("window").width / numColumns - 12;

export default function ExploreScreen() {
  const navigation = useNavigation<any>();

  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 📌 cargar posts iniciales
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await authApi.getExplorePosts(1);
      setPosts(data);
      setPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 paginación
  const loadMore = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;
      const data = await authApi.getExplorePosts(nextPage);

      if (data.length > 0) {
        setPosts((prev) => [...prev, ...data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const openPost = (postId: string) => {
    navigation.navigate("PostDetail", { postId });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#c9a84c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openPost(item.id)}
            style={styles.item}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color="#c9a84c" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 6,
  },
  item: {
    margin: 6,
  },
  image: {
    width: size,
    height: size,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});