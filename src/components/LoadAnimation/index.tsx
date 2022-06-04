import React from 'react';

import LottieView from 'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json';

import {
  Container,
} from './styles';

const LoadAnimation: React.FC = () => (
  <Container>
    <LottieView
      style={{ height: 200 }}
      resizeMode="contain"
      source={loadingCar}
      autoPlay
      loop
    />
  </Container>
);

export { LoadAnimation };
