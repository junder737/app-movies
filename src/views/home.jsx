import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBarComponent  from '../components/searchBar'
import Favorites from './favorites'
import Details from './details'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeScreen = ({ navigation }) => {


  return (
    <View>
      <SearchBarComponent  navigation = {navigation}/>
    </View>
  )
}

const FavoritesScreen = ({ navigation }) => {
  return (
    <Favorites />
  )
}

const DetailsScreen = ({ navigation }) => {
  return (
    <Details navigation={navigation} />
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen}  options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
};

export default function Home() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
           safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
  
              if (event.defaultPrevented) {
                preventDefault();
              } else {
               navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }
  
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;
  
              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="home" size={size} color={color} />;
              },
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="heart" size={size} color={color} />;
              },
          }}
        />
        {/*  <Tab.Screen
          name="Details"
          component={Details}
          options={{
            tabBarLabel: 'Detalles',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="heart" size={size} color={color} />;
              },
           
          }}
        /> */}
      </Tab.Navigator>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });