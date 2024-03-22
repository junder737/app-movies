import React, { useState, useEffect } from 'react'
import { Searchbar, Divider, List, TouchableRipple, Text, ProgressBar} from 'react-native-paper';
import { FlatList, StyleSheet, Image, ScrollView} from 'react-native'

import axios from 'axios';
const SearchBarComponent = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [mensajeBusqueda, setMensajeBusqueda] = useState('Ingrese para realizar una busqueda');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length > 3) {
                handleGetMovies(searchQuery);
            }
        }, 1000); 

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    
    const handleGetMovies = async (movieInput) => {
        try {
            setSearchQuery(movieInput);
            setIsLoading(true);
            const responseData = await axios.get(`https://www.omdbapi.com/?apikey=648e09b9&s=${movieInput}&type=movie`);

            if (!responseData.data.Search || !responseData.data.Search.length === 0) {
                setIsLoading(false);
                setMovie([]);
                setMensajeBusqueda('No se encontraron resultados');
                return;
            } 
            
            setIsLoading(false);
            setMovie(responseData.data.Search);
        } catch (error) {
            setMensajeBusqueda('Ocurrió un error al traer la información.');
        }
    }

    const renderItem = ({ item }) => (
        <TouchableRipple
            onPress={() => navigation.navigate('Details', { movie: item })}
            rippleColor="rgba(0, 0, 0, .32)">
            <List.Item
                title={item.Title}
                description={`Año: ${item.Year}`}
                left={props => <List.Icon {...props} icon="movie" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
            />
        </TouchableRipple>
    );
   
    return (
        <>
        <Text variant="headlineMedium" style={styles.titleComponent}>Listado de peliculas</Text>
            <Searchbar
                placeholder="Search"
                onChangeText={handleGetMovies}
                value={searchQuery}
                mode='bar'
                style={styles.search}

            />
            <Divider />
            <FlatList
                    data={movie}
                    renderItem={renderItem}
                    keyExtractor={item => item.imdbID}
                />

            {
                isLoading && <ProgressBar indeterminate={true} color="blue" />
            }
            {
                movie.length === 0 && !isLoading && <Text variant="headlineMedium" style={styles.titleComponent}>{mensajeBusqueda}</Text>
            }
        </>
    );
}

const styles = StyleSheet.create({
    search: {
        margin: 10,
    },
    titleComponent: {
       fontSize: 30,
       fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10
    },
    noDataImage: {
        width: '100%',
        height: '60%',
        marginTop: 10
    }
});
export default SearchBarComponent;