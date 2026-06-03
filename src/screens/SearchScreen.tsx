import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

import Avatar from '../components/Avatar';
import { searchApi } from '../services/api';

export default function SearchScreen() {

    const [query, setQuery] = useState('');

    const [results, setResults] =
        useState<any[]>([]);

    useEffect(() => {

        const timeout = setTimeout(() => {

            if (query.trim()) {

                searchUsers();

            } else {

                setResults([]);
            }

        }, 400);

        return () => clearTimeout(timeout);

    }, [query]);

    async function searchUsers() {

        try {

            const res =
                await searchApi.search(query);

            setResults(
                res.data.users || res.data || []
            );

        } catch (error) {

            console.log(error);
        }
    }

    return (

        <View style={styles.container}>

            <TextInput
                placeholder="Buscar usuarios..."
                placeholderTextColor="#777"
                value={query}
                onChangeText={setQuery}
                style={styles.input}
            />

            <FlatList
                data={results}
                keyExtractor={(item) => item._id}

                renderItem={({ item }) => (

                    <TouchableOpacity
                        style={styles.userRow}
                        onPress={() =>
                            router.push({
                                pathname: '/user/[id]',
                                params: { id: item._id },
                            })
                        }
                    >

                        <Avatar
                            src={item.avatar}
                            username={item.username}
                            size={45}
                        />

                        <Text style={styles.username}>
                            {item.username}
                        </Text>

                    </TouchableOpacity>

                )}
            />

        </View>

    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#0a0a0a',
        padding:15,
    },

    input:{
        backgroundColor:'#1a1a1a',
        color:'#fff',
        borderRadius:12,
        padding:14,
        marginBottom:15,
    },

    userRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:12,
        paddingVertical:14,
        borderBottomWidth:1,
        borderBottomColor:'#222',
    },

    username:{
        color:'#fff',
        fontSize:16,
        fontWeight:'600',
    },

});