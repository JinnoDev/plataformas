import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AppNavigator() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="#c9a84c" size="large" />
            </View>
        );
    }

    return user ? <Redirect href="/(tabs)/feed" /> : <Redirect href="/login" />;
}