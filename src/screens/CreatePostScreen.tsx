import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { postsApi } from '../services/api';

export default function CreatePostScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) return;

    try {
      const formData = new FormData();

      formData.append(
        'image',
        {
          uri: image,
          name: 'post.jpg',
          type: 'image/jpeg',
        } as any
      );

      formData.append('caption', caption);

      await postsApi.createPost(formData);

      setImage(null);
      setCaption('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
      >
        <Text>Seleccionar imagen</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

      <TextInput
        placeholder="Escribe una descripción..."
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createPost}
      >
        <Text>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#c9a84c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  preview: {
    width: '100%',
    height: 300,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});