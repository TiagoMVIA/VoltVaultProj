import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Text, RefreshControl } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import MainView from '../components/MainView';
import FavIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const FavList = () => {
    const [favoriteItems, setFavoriteItems] = useState<any>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFavoriteItems = () => {
        console.log('bd')
    };

    useEffect(() => {
        fetchFavoriteItems();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchFavoriteItems();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFavoriteItems();
        setRefreshing(false);
    };

    const getImageSource = (status: string) => {
        switch (status) {
            case 'available':
                return { uri: 'https://media.istockphoto.com/id/522355825/de/foto/gr%C3%BCne-ampel.jpg?s=2048x2048&w=is&k=20&c=FV1jGqb9bao--6qNBphr3FSuKANslE1Fz4oNAYZxt-Y=' };
            case 'occupied':
                return { uri: 'https://media.istockphoto.com/id/120600303/de/foto/gelbe-ampel.jpg?s=2048x2048&w=is&k=20&c=THbbOpSBe6BwV2cHQjvcVpiFfYJbzdbbOm0swhu7eBA=' };
            case 'offline':
                return { uri: 'https://media.istockphoto.com/id/1575858395/de/foto/rotes-licht-der-ampel-gegen-bew%C3%B6lkten-himmel.jpg?s=1024x1024&w=is&k=20&c=cBfjuDYWbe3xLPEOaVE3EhPcWxRKPcIOF6sMxYcmgTg=' };
            default:
                return { uri: 'https://media.istockphoto.com/id/1575858395/de/foto/rotes-licht-der-ampel-gegen-bew%C3%B6lkten-himmel.jpg?s=1024x1024&w=is&k=20&c=cBfjuDYWbe3xLPEOaVE3EhPcWxRKPcIOF6sMxYcmgTg=' };
        }
    };

    const renderItem = ({ item }: any) => (
        <Card style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.leftSide}>
                    <Title style={{ fontWeight: '600' }}>{item.location}</Title>
                    <View style={{ flexDirection: 'row' }}>
                        <Paragraph style={styles.paragraph}>Type: </Paragraph>
                        <Paragraph>{item.type}</Paragraph>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Paragraph style={styles.paragraph}>Status: </Paragraph>
                        <Paragraph>{item.status}</Paragraph>
                    </View>
                </View>
                <ImageBackground source={getImageSource(item.status)} resizeMode="cover" style={styles.rightSide}>
                </ImageBackground>
            </View>
        </Card>
    );

    return (
        <MainView title="FAVORITES LIST">
            <View style={styles.container}>
                {favoriteItems.length === 0 ? (
                    <Text style={styles.placeholderText}>You have no favorites yet...</Text>
                ) : (
                    <FlatList
                        data={favoriteItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        style={{ marginBottom: 50 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                )}
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginBottom: 10,
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        position: 'relative',
    },
    paragraph: {
        fontWeight: '500',
    },
    leftSide: {
        flex: 1,
        padding: 10,
    },
    rightSide: {
        width: '100%',
        flex: 0.6,
        position: 'relative',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#555',
        borderRadius: 20,
        padding: 5,
        opacity: 0.8,
    },
    placeholderText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default FavList;
