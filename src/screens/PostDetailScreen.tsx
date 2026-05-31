import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { authApi } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

interface Comment {
  id: string;
  text: string;
  user: {
    username: string;
    avatar?: string;
  };
}

export default function PostDetailScreen() {
  const route = useRoute<any>();
  const { postId } = route.params;

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  // 📌 CARGAR POST + COMENTARIOS
  useEffect(() => {
    const loadData = async () => {
      try {
        const postRes = await authApi.getPostById(postId);
        const commentsRes = await authApi.getPostComments(postId);

        setPost(postRes);
        setComments(commentsRes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [postId]);

  // 💬 ENVIAR COMENTARIO
  const sendComment = async () => {
    if (!text.trim()) return;

    try {
      setSending(true);

      const newComment = await authApi.createComment(postId, text);

      // actualización optimista
      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
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
      {/* POST */}
      <View style={styles.post}>
        {post?.image && (
          <Image source={{ uri: post.image }} style={styles.image} />
        )}

        <Text style={styles.caption}>{post?.caption}</Text>
      </View>

      {/* INPUT COMENTARIO */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe un comentario..."
          placeholderTextColor="#777"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <TouchableOpacity onPress={sendComment}>
          <Ionicons
            name="send"
            size={24}
            color={sending ? "gray" : "#c9a84c"}
          />
        </TouchableOpacity>
      </View>

      {/* LISTA COMENTARIOS */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.username}>{item.user.username}</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  caption: {
    color: "white",
    marginTop: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    color: "white",
    marginRight: 10,
  },
  comment: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  username: {
    color: "#c9a84c",
    fontWeight: "bold",
  },
  commentText: {
    color: "#ddd",
  },
});