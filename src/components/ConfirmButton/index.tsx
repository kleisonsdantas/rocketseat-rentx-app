import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
}
const ConfirmButton: React.FC<Props> = ({ title, color, ...rest }) => (
  <Container {...rest}>
    <Title>{title}</Title>
  </Container>
);

export { ConfirmButton };
