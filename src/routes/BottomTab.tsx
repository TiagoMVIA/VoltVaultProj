import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../pages/Home';
import ChargingPoint from '../pages/ChargingPoint';
import FavList from '../pages/FavList';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = focused ? 'power-plug' : 'power-plug-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'plus-circle' : 'plus-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#75b05b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingTop: 5,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          right: 0,
          bottom: 0,
          borderTopWidth: 0,
          height: 60,
          elevation: 15,
          paddingBottom: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add" component={ChargingPoint} />
      <Tab.Screen name="Favorites" component={FavList} />
    </Tab.Navigator>
  );
}

export default BottomTab;
