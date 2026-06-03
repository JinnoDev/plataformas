import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

// Contexto de Autenticación (Persona 1)
import { useAuth } from '../context/AuthContext';

// Pantallas de Autenticación (Persona 1)
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Pantallas de Funcionalidades Principales (Persona 2 & 3)
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

// Pantallas del Perfil, Búsqueda y Conexiones (Persona 3)
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FollowListScreen from '../screens/FollowListScreen';
import SavedPostsScreen from '../screens/SavedPostsScreen';

// Constantes de color (Persona 1)
import {colors} from '../constants/colors';

// Definición de los navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * 1. TAB NAVIGATOR: Las 4 pestañas principales requeridas.
 * Se configuran con estilos oscuros y los acentos dorados del proyecto.
 */
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary || '#c9a84c',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: '#262626',
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen 
        name="Feed" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Feed' }} // Puedes añadir iconos aquí si lo deseas
      />
      <Tab.Screen 
        name="Explorar" 
        component={ExploreScreen} 
        options={{ tabBarLabel: 'Explorar' }}
      />
      <Tab.Screen 
        name="Búsqueda" 
        component={SearchScreen} 
        options={{ tabBarLabel: 'Búsqueda' }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

/**
 * 2. APP NAVIGATOR PRINCIPAL (Nivel Raíz)
 * Controla el flujo completo evaluando si existe un token en el AuthContext.
 */
export default function AppNavigator() {
  const { user, loading } = useAuth(); // 'loading' debe ser manejado en AuthContext mientras lee AsyncStorage

  // Pantalla de carga mientras se verifica si hay un token guardado
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary || '#c9a84c'} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#121212' }
      }}
    >
      {user ? (
        // --- FLUJO AUTENTICADO ---
        <>
          {/* La pantalla base es el Tab de las 4 secciones */}
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
          
          {/* Pantallas secundarias a las que se navega por clicks en tarjetas, botones de perfil, etc. */}
          <Stack.Screen 
            name="CreatePost" 
            component={CreatePostScreen} 
            options={{ title: 'Nueva Publicación' }} 
          />
          <Stack.Screen 
            name="PostDetail" 
            component={PostDetailScreen} 
            options={{ title: 'Publicación' }} 
          />
          <Stack.Screen 
            name="UserProfile" 
            component={UserProfileScreen} 
            options={{ title: 'Perfil' }} 
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen} 
            options={{ title: 'Editar Perfil' }} 
          />
          <Stack.Screen 
            name="FollowList" 
            component={FollowListScreen} 
            options={{ title: 'Conexiones' }} 
          />
          <Stack.Screen 
            name="SavedPosts" 
            component={SavedPostsScreen} 
            options={{ title: 'Guardados' }} 
          />
        </>
      ) : (
        // --- FLUJO DE AUTENTICACIÓN ---
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
         {/* @ts-ignore */}
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
}