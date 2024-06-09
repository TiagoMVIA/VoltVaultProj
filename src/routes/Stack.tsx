import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab.tsx';
import ChargingPoint from '../pages/ChargingPoint';
import EditChargingPoint from '../pages/EditChargingPoint';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="ChargingPoint" component={ChargingPoint} />
      <Stack.Screen name="EditChargingPoint" component={EditChargingPoint} />
    </Stack.Navigator>
  );
}
