import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import Avatar from '../components/Avatar';
import { usersApi } from '../services/api';

export default function FollowListScreen() {

    const { id,type } =
        useLocalSearchParams();

    const [users,setUsers] =
        useState<any[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers(){

        try{

            const res =
                type === 'followers'
                ? await usersApi.getFollowers(id as string)
                : await usersApi.getFollowing(id as string);

            setUsers(
                res.data.users || res.data
            );

        } catch(error){

            console.log(error);
        }
    }

    return(

        <FlatList
            style={styles.container}
            data={users}
            keyExtractor={(item)=>item._id}

            renderItem={({item})=>(

                <TouchableOpacity
                    style={styles.row}
                    onPress={() =>
                        router.push(
                            `/user/${item._id}`
                        )
                    }
                >

                    <Avatar
                        src={item.avatar}
                        username={item.username}
                        size={50}
                    />

                    <Text style={styles.username}>
                        {item.username}
                    </Text>

                </TouchableOpacity>

            )}
        />

    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#0a0a0a',
        padding:15,
    },

    row:{
        flexDirection:'row',
        alignItems:'center',
        gap:12,
        paddingVertical:15,
    },

    username:{
        color:'#fff',
        fontSize:16,
    },

});