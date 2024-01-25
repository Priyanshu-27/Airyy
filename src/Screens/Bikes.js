import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../Components/Header';
import axios from 'axios';
import {DOMAIN} from '@env';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
const Bikes = () => {
  const [search, setSearch] = useState('');
  const [Bikes, setBikes] = useState([]);
  const navigation = useNavigation();
  const handleSearch = () => {
    console.log(search);
  };
  const fetchData = async () => {
    const result = await axios.get(`https://${DOMAIN}/Admin/bike-data/`);
    setBikes(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.bikeCard}
      onPress={() => {
        const selectedBike = Bikes.find((bike) => bike.b_id === item.b_id);
        if (selectedBike) {
          navigation.navigate('BikeDetails', { selectedBike });
        }
      }}>
      <View>
        <Text style={styles.bikeName}>{item.b_id}</Text>
        <Image
          resizeMode="cover"
          source={{uri: item.Image}}
          className="w-32 h-32 ml-2"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Select Bike</Text>
        <Text style={styles.boldText}>and ride now!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar__unclicked}>
          <TextInput
            style={styles.inputForSearch}
            placeholderTextColor={'#000000c2'}
            placeholder="Find your Ride"
            value={search}
            onChangeText={text => {
              setSearch(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleSearch();
            }}>
            <MaterialIcons
              name="search"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={Bikes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.bikeList}
      />
    </View>
  );
};

export default Bikes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000c2',
  },
  searchContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  searchBar__unclicked: {
    padding: 2,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffff',
    elevation: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  inputForSearch: {
    fontSize: 20,
    marginLeft: 10,
    color: '#000000c2',
    flex: 1,
  },
  bikeList: {
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  bikeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    height: 180,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bikeName: {
    fontSize: 16,
    color: 'black',
  },
});