import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Text, MD3Colors, TouchableRipple } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import ModalFavorite from '../components/modal';
const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('clave');

      const parsedFavorites = JSON.parse(value);
      if (value !== null) {
        console.log("DATA FAVORITOS ", parsedFavorites);
        setFavorites(parsedFavorites);
        console.log(typeof parsedFavorites);
      }
      if (value !== null) {
      
      }
    } catch (e) {
      console.error('Error al leer favoritos:', e);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text variant="displayLarge">Mis Favoritos</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View>
            <TouchableRipple
              
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Section>
                <List.Subheader>{item.Title}</List.Subheader>
                <List.Item
                  title={item.Type}
                  description={item.Year}
                  left={props => <List.Icon {...props} icon="movie" />}
                />
              </List.Section>
            </TouchableRipple>
          </View>
        )}
      />
  <ModalFavorite set/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
export default Favorites