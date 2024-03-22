import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Card, IconButton, Chip, Button, List, Text, Snackbar, ActivityIndicator, MD2Colors } from 'react-native-paper';
import TagType from '../components/chip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function Details() {

    const route = useRoute();
    const { movie } = route.params;
    const [detailMovie, setDetailMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        getFavorites();
        getDetailMovie();


    }, [])

    const onToggleSnackBar = () => setIsLoading(!isLoading);

    const onDismissSnackBar = () => setIsLoading(false);

    const getFavorites = async () => {
        try {
            // Obtengo los favoritos del storage usando un indentificado, en este caso puse "clave"
            const value = await AsyncStorage.getItem('clave');
            if (value !== null) {
                const parsedFavorites = JSON.parse(value);
                setFavorites(parsedFavorites);
            }
        } catch (e) {
            setSnackbarMessage("Error obtener la información de favoritos");
            onToggleSnackBar();
        }
    };
    const getDetailMovie = async () => {
        try {
            // Obtengo la data de la API pero en este caso en plot full para obtener todos los detalles, ademas validando de que sea una pelicula 
            const responseData = await axios.get(`https://www.omdbapi.com/?apikey=648e09b9&i=${movie.imdbID}&plot=full&type=movie`);
            if (!responseData.data) {
                return
            }
            setVisible(true);
            setDetailMovie(responseData.data);
        } catch (error) {
            setSnackbarMessage("Error al traer la data");
            onToggleSnackBar();
        }
    }

    const addFavorites = async (movie) => {
        try {
            const nuevoFavorito = movie;
            // Validar que el favorito no exista
            const validarPelicula = favorites.some((pelicula) => {
                return (pelicula.imdbID === nuevoFavorito.imdbID)
            })
            if (validarPelicula) {
                setSnackbarMessage("Ya tienes esta pelicula en favoritos.");
                onToggleSnackBar();
                return
            }
            // Agregar el nuevo favorito
            const nuevosFavoritos = [...favorites, nuevoFavorito];


            try {
                // Almacenar el nuevo favorito en el storage
                await AsyncStorage.setItem('clave', JSON.stringify(nuevosFavoritos));
                setFavorites(nuevosFavoritos);
                setSnackbarMessage("Agregado correctamente");
                onToggleSnackBar();
            } catch (e) {
                setSnackbarMessage("Error al agregar a favoritos");
                onToggleSnackBar();
            }
        } catch (e) {
            setSnackbarMessage("Error al agregar a favoritos");
            onToggleSnackBar();
            
        }
    }
    return (
        <View style={styles.container} >
            
            <ScrollView>
            {
                visible ? <Card.Content>
                   {
                       detailMovie.Poster !== "N/A" ? <Card.Cover source={{ uri: detailMovie.Poster }} /> : null
                   }
                    <Text variant="displayLarge">{detailMovie.Title}</Text>
                    <Text variant="bodyMedium">{detailMovie.Plot}</Text>
                    <TagType style={styles.shortChip} data={detailMovie.Runtime} icon={"clock-outline"}></TagType>
                    <TagType style={styles.shortChip} data={detailMovie.Language} icon={"book"}> </TagType>
                    <TagType style={styles.longChip} data={"Género: " + detailMovie.Genre} icon={"movie"}> </TagType>
                    <TagType style={styles.longChip} data={"Director: " + detailMovie.Director} icon={"account"}> </TagType>
                    <TagType style={styles.longChip} data={"Estreno: " + detailMovie.Released + ""} icon={"calendar"}> </TagType>
                    <Button mode="contained" style={styles.btnFavorite} onPress={() => addFavorites(detailMovie)} icon="heart">Agregar a Favoritos</Button>
                </Card.Content> : <ActivityIndicator animating={true} style={styles.loading} size={"large"} color={MD2Colors.red800} />
            }
            <Snackbar
                        visible={isLoading}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: 'Ok',
                            onPress: () => {

                            }

                        }}>
                        {snackbarMessage}
                    </Snackbar>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    shortChip: {
        marginTop: 5,
        width: '30%',
        marginBottom: 5
      },
      longChip: {
        marginTop: 5,
        width: '100%',
        marginBottom: 5
      },
      btnFavorite: {
        marginTop: 10
      },
      loading:{
        marginTop: 10
      }
});
export default Details