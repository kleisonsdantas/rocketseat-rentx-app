import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps{
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
      enable={!disabled}
      {...rest}
    >
      {loading
        ? <ActivityIndicator color={theme.colors.background_secondary} />
        : <Title>{title}</Title>}
    </Container>
  );
};

export { Button };
