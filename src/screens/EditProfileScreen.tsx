import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';
import { usersApi } from '../services/api';

export default function EditProfileScreen() {

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {

    try {

      const res = await usersApi.getMe();

      setName(res.data.name || '');
      setBio(res.data.bio || '');

    } catch (err) {
      console.log(err);
    }
  }

  async function saveProfile() {

    try {

      setLoading(true);

      await usersApi.updateMe({
        name,
        bio,
      });

      router.back();

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Editar Perfil
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Bio"
        placeholderTextColor="#666"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveProfile}
        disabled={loading}
      >

        <Text style={styles.buttonText}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#0a0a0a',
    padding:20,
  },

  title:{
    color:'#fff',
    fontSize:26,
    fontWeight:'700',
    marginBottom:30,
  },

  input:{
    backgroundColor:'#1a1a1a',
    color:'#fff',
    borderRadius:12,
    padding:14,
    marginBottom:20,
  },

  button:{
    backgroundColor:'#c9a84c',
    padding:15,
    borderRadius:12,
    alignItems:'center',
  },

  buttonText:{
    color:'#000',
    fontWeight:'700',
  },

});