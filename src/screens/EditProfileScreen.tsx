import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { usersApi, uploadAvatar, api} from '../services/api';
import Avatar from '../components/Avatar';
import {colors} from '../constants/colors';

export default function EditProfileScreen({ navigation }: any) {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [updating, setUpdating] = useState(false);

  const changeAvatarHandler = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso Requerido', 'Necesitamos acceso a tu galería para cambiar el avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setUpdating(true);
      try {
        await uploadAvatar(result.assets[0].uri);
        await refreshUser(); // Refresca el contexto global
        Alert.alert('Éxito', 'Foto de perfil actualizada correctamente.');
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'No se pudo subir la imagen.');
      } finally {
        setUpdating(false);
      }
    }
  };

  const saveProfileHandler = async () => {
    setUpdating(true);
    try {
      
      await api.patch('/users/me', { name, bio });
      await refreshUser();
      Alert.alert('Éxito', 'Perfil actualizado.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Hubo un fallo al actualizar tus datos.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarSection} onPress={changeAvatarHandler} disabled={updating}>
        {/* @ts-ignore */}
        <Avatar source= {(user?.avatar || '')as any}name={name} size={100} />
        <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Tu nombre" placeholderTextColor="#555" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Biografía</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          value={bio} 
          onChangeText={setBio} 
          placeholder="Cuéntanos un poco de ti" 
          placeholderTextColor="#555"
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={saveProfileHandler} disabled={updating}>
        {updating ? <ActivityIndicator color="#000" /> : <Text style={styles.saveBtnText}>Guardar Cambios</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  avatarSection: { alignItems: 'center', marginVertical: 20 },
  changePhotoText: { color: '#c9a84c', marginTop: 10, fontWeight: '600' },
  inputGroup: { marginBottom: 20 },
  label: { color: '#8E8E93', marginBottom: 6, fontSize: 14 },
  input: { backgroundColor: '#1C1C1E', color: '#FFF', padding: 12, borderRadius: 8, fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#c9a84c', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveBtnText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});