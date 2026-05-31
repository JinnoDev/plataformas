import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { authApi } from "../services/api";

interface Post {
  id: string;
  caption: string;
  image?: string;
  likesCount: number;
  repostsCount: number;
  isLiked: boolean;
  isReposted: boolean;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
}

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const navigation = useNavigation<any>();

  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const [reposted, setReposted] = useState(post.isReposted);
  const [repostsCount, setRepostsCount] = useState(post.repostsCount);

  // ❤️ LIKE (optimista)
  const handleLike = async () => {
    try {
      if (liked) {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
        await authApi.unlikePost(post.id);
      } else {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
        await authApi.likePost(post.id);
      }
    } catch (error) {
      // rollback si falla
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  // 🔁 REPOST
  const handleRepost = async () => {
    try {
      if (reposted) {
        setReposted(false);
        setRepostsCount((prev) => prev - 1);
        await authApi.unrepostPost(post.id);
      } else {
        setReposted(true);
        setRepostsCount((prev) => prev + 1);
        await authApi.repostPost(post.id);
      }
    } catch (error) {
      setReposted((prev) => !prev);
      setRepostsCount((prev) => (reposted ? prev + 1 : prev - 1));
    }
  };

  // 📌 abrir detalle
  const openPost = () => {
    navigation.navigate("PostDetail", { postId: post.id });
  };

  return (
    <View style={styles.container}>
      {/* HEADER USER */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.user.avatar || "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>

      {/* IMAGEN */}
      {post.image && (
        <TouchableOpacity onPress={openPost}>
          <Image source={{ uri: post.image }} style={styles.image} />
        </TouchableOpacity>
      )}

      {/* CAPTION */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* ACCIONES */}
      <View style={styles.actions}>
        {/* LIKE */}
        <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color={liked ? "red" : "white"}
          />
          <Text style={styles.count}>{likesCount}</Text>
        </TouchableOpacity>

        {/* REPOST */}
        <TouchableOpacity onPress={handleRepost} style={styles.actionBtn}>
          <Ionicons
            name="repeat"
            size={22}
            color={reposted ? "#c9a84c" : "white"}
          />
          <Text style={styles.count}>{repostsCount}</Text>
        </TouchableOpacity>

        {/* COMENTARIOS */}
        <TouchableOpacity onPress={openPost} style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 8,
  },
  caption: {
    color: "#ddd",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  count: {
    color: "white",
    marginLeft: 5,
  },
});