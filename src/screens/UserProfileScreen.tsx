import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Avatar from '../components/Avatar';
import { usersApi, postsApi } from '../services/api';

export default function UserProfileScreen() {

    const { id } = useLocalSearchParams();

    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);


    useEffect(() => {
        loadUser();
    }, [id]);

    async function toggleFollow() {

    try {

        if (isFollowing) {

            await usersApi.unfollow(id as string);

            setIsFollowing(false);

        } else {

            await usersApi.follow(id as string);

            setIsFollowing(true);

        }

    } catch (error) {

        console.log(error);
    }
}

    async function loadUser() {

        try {

            const [userRes, postsRes] =
                await Promise.all([
                    usersApi.getProfile(id as string),
                    postsApi.getPostsByUser(id as string),
                ]);

            setUser(userRes.data);setIsFollowing(
    userRes.data.isFollowing || false
);

            setPosts(postsRes.data.posts || postsRes.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    if (loading) {

        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#c9a84c" />
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
                    />

                    <Text style={styles.username}>
                        {user?.username}
                    </Text>


                    <Text style={styles.bio}>
                        {user?.bio}
                    </Text>
                    <TouchableOpacity
                        style={styles.followButton}
                        onPress={toggleFollow}
                    >
                        <Text style={styles.followText}>
                            {isFollowing ? 'siguiendo' : 'seguir'}
                        </Text>
                    </TouchableOpacity>

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
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0a0a0a',
    },

    header:{
        backgroundColor:'#0a0a0a',
        alignItems:'center',
        padding:20,
    },

    username:{
        color:'#fff',
        fontSize:22,
        fontWeight:'700',
        marginTop:10,
    },

    bio:{
        color:'#aaa',
        marginTop:10,
    },

    post:{
        width:'33.33%',
        aspectRatio:1,
    },
    followButton:{
        backgroundColor:'#c9a84c',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:12,
        marginTop:15,
    },

    followText:{
        color:'#000',
        fontWeight:'700',
    },

});