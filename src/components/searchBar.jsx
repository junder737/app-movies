import React, { useState } from 'react'
import { Searchbar, Divider, List, TouchableRipple, ScrollView } from 'react-native-paper';
import { FlatList, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
const SearchBarComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movie, setMovie] = useState([]);
    const handleGetMovies = async (movieInput) => {
        try {
            setSearchQuery(movieInput);
            if (movieInput.length > 3) {
                const responseData = await axios.get(`https://www.omdbapi.com/?apikey=648e09b9&s=${movieInput}`);
                console.log("data response ", responseData.data.Search);
                if (!responseData.data.Search) {
                    setMovie([]);
                    return
                }
                setMovie(responseData.data.Search);

            }

        } catch (error) {
            console.log("Error al traer la data");
        }
    }
    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={handleGetMovies}
                value={searchQuery}
                mode='bar'

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
                            left={props => <List.Icon {...props} icon="camera" />}
                        />
                    </TouchableRipple>
                ))
            }
        </>
    );
}

export default SearchBarComponent;