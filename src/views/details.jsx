import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
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
            const value = await AsyncStorage.getItem('clave');
            if (value !== null) {
                const parsedFavorites = JSON.parse(value);
                setFavorites(parsedFavorites);
            }
        } catch (e) {
            console.error('Error al leer favoritos:', e);
        }
    };
    const getDetailMovie = async () => {
        try {
            const responseData = await axios.get(`https://www.omdbapi.com/?apikey=648e09b9&i=${movie.imdbID}&plot=full`);
            if (!responseData.data) {
                // Mostrar que hubo un error al mostrar la data
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
            const validarPelicula = favorites.some((pelicula) => {
                return (pelicula.imdbID === nuevoFavorito.imdbID)
            })
            if (validarPelicula) {
                setSnackbarMessage("Ya la tienes en favoritos.");
                onToggleSnackBar();
                return
            }
            const nuevosFavoritos = [...favorites, nuevoFavorito];
            
           
            try {
                await AsyncStorage.setItem('clave', JSON.stringify(nuevosFavoritos));
                setFavorites(nuevosFavoritos);
                setSnackbarMessage("Agregado correctamente");
                onToggleSnackBar();
            } catch (e) {
                setSnackbarMessage("Error al agregar a favoritos");
                onToggleSnackBar();
            }
        } catch (e) {
            console.log("ERROR AL GUARDAR", e);
            // saving error
        }
    }
    return (
        <View style={styles.container} >
            {/* <Card.Cover source={{ uri: detailMovie.Poster }} /> */}

            {
                visible ? <><Card.Content>
                <Text variant="displayLarge">{detailMovie.Title}</Text>
                <Text variant="titleLarge">{detailMovie.Writer}</Text>
                <Text variant="bodyMedium">{detailMovie.Plot}</Text>
                <List.Section>
                    <List.Item title={detailMovie.Genre} left={() => <List.Icon icon="movie" />} />
                    <List.Item
                        title={detailMovie.Year}
                        left={() => <List.Icon icon="calendar" />}
                    />
                </List.Section>
                <Button mode="contained" onPress={() => addFavorites(movie)} icon="heart">Agregar a Favoritos</Button>
            </Card.Content>
            <Snackbar
                visible={isLoading}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Ok',
                    onPress: () => { 
                        
                       }
                    
                }}>
                {snackbarMessage}
            </Snackbar></> : <ActivityIndicator animating={true} color={MD2Colors.red800} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
});
export default Details