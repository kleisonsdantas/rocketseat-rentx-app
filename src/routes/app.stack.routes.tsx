import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();
const AppStackRoutes: React.FC = () => (
  <Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen
      name="Home"
      component={Home}
    />
    <Screen
      name="CarDetails"
      component={CarDetails}
    />
    <Screen
      name="Scheduling"
      component={Scheduling}
    />
    <Screen
      name="SchedulingDetails"
      component={SchedulingDetails}
    />
    <Screen
      name="Confirmation"
      component={Confirmation}
    />
  </Navigator>
);

export { AppStackRoutes };
