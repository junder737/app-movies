import React, { useState, useEffect } from 'react'
import { Searchbar, Divider, List, TouchableRipple, Text, ProgressBar} from 'react-native-paper';
import { FlatList, StyleSheet, Image } from 'react-native'

import axios from 'axios';
const SearchBarComponent = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState([]);

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
           
            console.log("PRESS", movieInput);
            setSearchQuery(movieInput);
            setIsLoading(true);
            const responseData = await axios.get(`https://www.omdbapi.com/?apikey=648e09b9&s=${movieInput}`);
            console.log("data response ", responseData.data.Search);
            if (!responseData.data.Search || !responseData.data.Search.length === 0) {
               
                setMovie([]);
                return;
            } 
            
            setIsLoading(false);
            setMovie(responseData.data.Search);
        } catch (error) {
            console.log("Error al traer la data");
        }
    }
   
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
            {
                movie.map(element => (
                    <TouchableRipple
                        onPress={() => console.log('Pressed')}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <List.Item
                            key={element.imdbID}
                            title={element.Title}
                            description={element.Year}
                            left={props => <List.Icon {...props} icon="movie" />}
                            onPress={() => navigation.navigate('Details', { movie: element })}
                        />
                    </TouchableRipple>
                ))
            }
           {/*  {
                movie.length === 0 &&  <Image style={styles.noDataImage} source={require('../assets/no_data.png')}></Image>
            } */}
            {
                isLoading && <ProgressBar indeterminate={true} color="blue" />
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