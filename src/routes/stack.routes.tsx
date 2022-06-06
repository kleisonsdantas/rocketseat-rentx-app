import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SingUpFirstStep } from '../screens/SingUp/SingUpFirstStep';
import { SingUpSecondStep } from '../screens/SingUp/SingUpSecondStep';

const { Navigator, Screen } = createNativeStackNavigator();
const StackRoutes: React.FC = () => (
  <Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen
      name="Splash"
      component={Splash}
    />
    <Screen
      name="SignIn"
      component={SignIn}
    />
    <Screen
      name="SingUpFirstStep"
      component={SingUpFirstStep}
    />
    <Screen
      name="SingUpSecondStep"
      component={SingUpSecondStep}
    />
    <Screen
      name="Home"
      component={Home}
      options={{
        gestureEnabled: false,
      }}
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
    <Screen
      name="MyCars"
      component={MyCars}
    />
  </Navigator>
);

export { StackRoutes };
