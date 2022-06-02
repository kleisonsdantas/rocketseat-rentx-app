import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Title,
} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
}
const ConfirmButton: React.FC<Props> = ({ title, color, ...rest }) => (
  <Container {...rest}>
    <Title>{title}</Title>
  </Container>
);

export { ConfirmButton };
