/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { AppRegistry, Dimensions, ActivityIndicator, AsyncStorage, View, StyleSheet, StatusBar } from 'react-native';
import { StackNavigator, DrawerNavigator, createStackNavigator, createSwitchNavigator, TabNavigator, TabBarBottom, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/FontAwesome';

import BusScreen from './app/screens/busListingScreen/busListingScreen';
import TrainScreen from './app/screens/trainListingScreen/trainListingScreen';
import ProfileScreen from './app/screens/profileScreen/profileScreen';
import LoginScreen from './app/screens/loginScreen/loginScreen';


class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AuthStack = createStackNavigator(
  {
      Login:{
          screen:LoginScreen
      }
  },{
      initialRouteName:"Login",
      headerMode:"none"
  }
)

const AppStack = createBottomTabNavigator(
{
  Bus: { screen: BusScreen },
  Train: { screen: TrainScreen },
  Profile: { screen: ProfileScreen },

},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Bus') {
        iconName = 'bus';
      } else if (routeName === 'Train') {
        iconName = 'train';
      } else if (routeName === 'Profile') {
        iconName = 'user';
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#3d9bf9',
    inactiveTintColor: 'gray',
  },
}  
);


export default createSwitchNavigator (
  {
      AuthLoading:AuthLoadingScreen,
      App: AppStack,
      Auth : AuthStack,
  },
  {
      initialRouteName:'AuthLoading'
  }
)
