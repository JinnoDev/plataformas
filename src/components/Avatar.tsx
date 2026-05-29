import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface AvatarProps {
    src?: string;
    username?: string;
    size?: number;
    onClick?: () => void;
}

export default function Avatar({ src, username, size = 40, onClick }: AvatarProps) {
    const initials = username ? username.charAt(0).toUpperCase() : '?';

    const content = src ? (
        <Image
            source={{ uri: src }}
            style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
            onError={() => {}}
        />
    ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
            <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
        </View>
    );

    if (onClick) {
        return (
            <TouchableOpacity onPress={onClick}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: '#1a1a1a',
    },
    placeholder: {
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c9a84c33',
    },
    initials: {
        color: '#c9a84c',
        fontWeight: '600',
    },
});