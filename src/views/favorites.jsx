import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Text, TouchableRipple, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import ModalFavorite from '../components/modal';
const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState({});
  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('clave');

      const parsedFavorites = JSON.parse(value);
      if (value !== null) {
        setFavorites(parsedFavorites);
        console.log(typeof parsedFavorites);
      }
      if (value !== null) {

      }
    } catch (e) {
      console.error('Error al leer favoritos:', e);
    }
  }

  const openDialogModalFavoritos = (item) => {
    setModalVisible(!modalVisible);
    setPeliculaSeleccionada(item);
  }
  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text variant="headlineMedium" style={styles.titleComponent}>Mis Favoritos</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>Aqui se listarán todas las peliculas que haz agregado</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View>
            <TouchableRipple
              onPress={() => openDialogModalFavoritos(item)}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Section>
                <List.Item
                  title={item.Title}
                  description={item.Year}
                  left={props => <List.Icon {...props} icon="movie" />}

                />
              </List.Section>
            </TouchableRipple>
            <Divider />
          </View>

        )}
        ListEmptyComponent={() => (
          <Image source={require('../assets/no_data.png')} style={styles.noDataImage} />
        )}
      />
      <ModalFavorite modalVisible={modalVisible} setModalVisible={setModalVisible} peliculaSeleccionada={peliculaSeleccionada} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  titleComponent: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  noDataImage: {
    width: 500, height: 500, justifyContent: 'center', alignSelf: 'center'
  }
});
export default Favorites