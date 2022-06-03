import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Container,
  Title,
} from './styles';

interface Props extends TouchableOpacityProps{
  title: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
}
const Button: React.FC<Props> = ({
  title, color, disabled = false, loading = false, ...rest
}) => {
  const theme = useTheme();

  return (
    <Container
      style={{ opacity: disabled ? 0.5 : 1 }}
      color={color}
      disabled={disabled}
      {...rest}
    >
      {loading
        ? <ActivityIndicator color={theme.colors.background_secondary} />
        : <Title>{title}</Title>}
    </Container>
  );
};

export { Button };
