import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FormScreen} from '../screens/FormScreen';
import {CheckoutScreen} from '../screens/CheckoutScreen';
import { FinishScreen } from '../screens/FinishScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="FormScreen" component={FormScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name='FinishScreen' component={FinishScreen} />
    </Stack.Navigator>
  );
};
