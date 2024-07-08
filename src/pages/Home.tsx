import React, { useRef, useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Text,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  TextInput,
  IconButton,
  Button,
  Icon
} from 'react-native-paper';
import MainView from '../components/MainView';
import BottomSheet from '../components/BottomSheet';
import FavIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ChargingPoint = {
  id: string;
  location: string;
  type: string;
  status: string;
  isFav: boolean;
};

const Home: React.FC = () => {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState('name');
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [filteredData, setFilteredData] = useState<ChargingPoint[]>([]);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const refRBSheet = useRef<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation: any = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const refreshData = async () => {
        await onRefresh();
      };
      refreshData();
    }, [])
  );

  const onRefresh = () => {
    console.log('db')
  };

  useEffect(() => {
    console.log('db')
  }, []);

  useEffect(() => {
    filterData(text, type, status);
  }, [text, type, status, chargingPoints]);

  const filterData = (searchText: string, filterType: string, filterStatus: string) => {
    const filteredItems = chargingPoints.filter((item) => {
      const matchesText = item.location.toLowerCase().startsWith(searchText.toLowerCase());
      const matchesType = filterType ? item.type.toLowerCase() === filterType.toLowerCase() : true;
      const matchesStatus = filterStatus ? item.status.toLowerCase() === filterStatus.toLowerCase() : true;
      return matchesText && matchesType && matchesStatus;
    });
    setFilteredData(filteredItems);
  };

  const handleTextChange = (searchText: string) => {
    setText(searchText);
  };

  const toggleFavorite = async (id: string) => {
    console.log('db')
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

  const renderItem = ({ item }: { item: ChargingPoint }) => (
    <Pressable onPress={() => navigation.navigate('EditChargingPoint', { item })}>
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
            <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.id)}>
              <FavIcon name={item.isFav ? 'heart' : 'heart-outline'} size={20} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Card>
    </Pressable>
  );

  return (
    <MainView title="CHARGING POINTS">
      <View style={styles.container}>
        <View style={styles.inputAndFilter}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={"Find by name"}
            value={text}
            onChangeText={handleTextChange}
            outlineColor="#fff"
            textColor="#666"
            selectionColor="#fff"
          />
          <TouchableOpacity onPress={() => refRBSheet.current?.open()} style={styles.filterButton}>
            <Icon source="filter" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
        {filteredData.length === 0 ? (
          <Text style={styles.noEntriesText}>You have no entries...</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={{ marginBottom: 50 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
      <BottomSheet ref={refRBSheet}>
        <View style={{ padding: 20 }}>
          <Text style={styles.filterOptionsText}>Filters</Text>
          <View>
            <Text style={styles.filterType}>Type:</Text>
            <View style={styles.specificFilterWrapper}>
              <Button icon="speedometer" mode={type === 'fast' ? 'contained' : 'elevated'} onPress={() => setType(type !== 'fast' ? 'fast' : '')}>Fast</Button>
              <Button icon="speedometer-medium" mode={type === 'standard' ? 'contained' : 'elevated'} onPress={() => setType(type !== 'standard' ? 'standard' : '')}>Standard</Button>
              <Button icon="speedometer-slow" mode={type === 'slow' ? 'contained' : 'elevated'} onPress={() => setType(type !== 'slow' ? 'slow' : '')}>Slow</Button>
            </View>
          </View>
          <View>
            <Text style={styles.filterType}>Status:</Text>
            <View style={styles.specificFilterWrapper}>
              <Button style={{ flex: 1 }} mode={status === 'available' ? 'contained' : 'elevated'} onPress={() => setStatus(status !== 'available' ? 'available' : '')}>Available</Button>
              <Button style={{ flex: 1 }} mode={status === 'occupied' ? 'contained' : 'elevated'} onPress={() => setStatus(status !== 'occupied' ? 'occupied' : '')}>Occupied</Button>
              <Button style={{ flex: 1 }} mode={status === 'offline' ? 'contained' : 'elevated'} onPress={() => setStatus(status !== 'offline' ? 'offline' : '')}>Offline</Button>
            </View>
          </View>
        </View>
      </BottomSheet>
    </MainView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    flex: 1,
    marginRight: 10,
  },
  inputAndFilter: {
    flexDirection: 'row',
  },
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
  filterButton: {
    backgroundColor: '#75b05b',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12.3,
    marginBottom: 13,
    borderRadius: 5,
  },
  specificFilterWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  filterOptionsText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 20,
  },
  filterType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
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
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#555',
    borderRadius: 20,
    padding: 5,
    opacity: 0.8,
  },
  btnFilter: {
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
  },
  noEntriesText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});

export default Home;
