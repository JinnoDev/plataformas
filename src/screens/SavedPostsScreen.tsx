import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { usersApi } from '../services/api';

export default function SavedPostsScreen() {

    const [posts,setPosts] =
        useState<any[]>([]);

    const [loading,setLoading] =
        useState(true);

    useEffect(() => {
        loadSaved();
    }, []);

    async function loadSaved() {

        try {

            const res =
                await usersApi.getSaved();

            setPosts(
                res.data.posts || res.data
            );

        } catch(error){

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
            keyExtractor={(item)=>item._id}

            renderItem={({item}) => (

                <Image
                    source={{ uri:item.image }}
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

    post:{
        width:'33.33%',
        aspectRatio:1,
    },

});