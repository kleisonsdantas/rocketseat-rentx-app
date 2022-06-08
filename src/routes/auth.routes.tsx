import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SingUpFirstStep } from '../screens/SingUp/SingUpFirstStep';
import { SingUpSecondStep } from '../screens/SingUp/SingUpSecondStep';

const { Navigator, Screen } = createNativeStackNavigator();
const AuthRoutes: React.FC = () => (
  <Navigator
    initialRouteName="Splash"
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
      name="Confirmation"
      component={Confirmation}
    />
  </Navigator>
);

export { AuthRoutes };
