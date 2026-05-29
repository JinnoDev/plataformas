import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#1a1a1a' },
            tabBarActiveTintColor: '#c9a84c',
            tabBarInactiveTintColor: '#555',
        }}>
            <Tabs.Screen
                name="feed"
                options={{ title: 'Feed', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }}
            />
            <Tabs.Screen
                name="explore"
                options={{ title: 'Explorar', tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} /> }}
            />
            <Tabs.Screen
                name="search"
                options={{ title: 'Buscar', tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} /> }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: 'Perfil', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }}
            />
        </Tabs>
    );
}