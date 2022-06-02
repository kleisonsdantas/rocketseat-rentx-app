import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Title,
} from './styles';

interface Props extends TouchableOpacityProps{
  title: string;
  color?: string;
}
const Button: React.FC<Props> = ({ title, color, ...rest }) => (
  <Container color={color} {...rest}>
    <Title>{title}</Title>
  </Container>
);

export { Button };
