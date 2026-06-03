import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Avatar from '../components/Avatar';
import { usersApi, postsApi } from '../services/api';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { uploadAvatar } from '../services/api'; 

export default function ProfileScreen() {

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);
  async function changeAvatar() {
    try {

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) return;

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

        if (result.canceled) return;

        await uploadAvatar(
            result.assets[0].uri
        );

        loadProfile();

    } catch (error) {

        console.log(error);
    }
}
  }

  async function loadProfile() {

    try {

      const [userRes, postsRes] = await Promise.all([
        usersApi.getMe(),
        postsApi.getMyPosts(),
      ]);

      setUser(userRes.data);

      setPosts(
        postsRes.data.posts || postsRes.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#c9a84c"
        />
      </View>
    );
  }

  return (

    <FlatList
      data={posts}
      numColumns={3}
      keyExtractor={(item) => item._id}

      ListHeaderComponent={

        <View style={styles.header}>

          <Avatar
            src={user?.avatar}
            username={user?.username}
            size={90}
            onClick={changeAvatar}
          />

          <Text style={styles.username}>
            {user?.username}
          </Text>

          <Text style={styles.bio}>
            {user?.bio || 'Sin biografía'}
          </Text>

          <View style={styles.stats}>
            <TouchableOpacity
             style={styles.button}
             onPress={() => router.push('/edit-profile')}
             >
                <Text style={styles.buttonText}>
                    Editar perfil
                </Text>
             </TouchableOpacity>
        

            <View>

              <Text style={styles.number}>
                {posts.length}
              </Text>

              <Text style={styles.label}>
                Posts
              </Text>

            </View>

            <View>

              <Text style={styles.number}>
                {user?.followersCount || 0}
              </Text>

              <Text style={styles.label}>
                Seguidores
              </Text>

            </View>

            <View>

              <Text style={styles.number}>
                {user?.followingCount || 0}
              </Text>

              <Text style={styles.label}>
                Siguiendo
              </Text>

            </View>

          </View>

        </View>

      }

      renderItem={({ item }) => (

        <Image
          source={{ uri: item.image }}
          style={styles.post}
        />

      )}

    />

  );
}

const styles = StyleSheet.create({

  loader:{
    flex:1,
    backgroundColor:'#0a0a0a',
    justifyContent:'center',
    alignItems:'center',
  },

  header:{
    backgroundColor:'#0a0a0a',
    padding:20,
    alignItems:'center',
  },

  username:{
    color:'#fff',
    fontSize:22,
    fontWeight:'700',
    marginTop:12,
  },

  bio:{
    color:'#aaa',
    marginVertical:10,
  },

  stats:{
    flexDirection:'row',
    gap:35,
    marginTop:15,
  },

  number:{
    color:'#fff',
    fontWeight:'700',
    textAlign:'center',
  },

  label:{
    color:'#777',
  },

  post:{
    width:'33.33%',
    aspectRatio:1,
  },
  button:{
    backgroundColor:'#c9a84c',
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:12,
    marginTop:20,
},

buttonText:{
    color:'#000',
    fontWeight:'700',
},

});
