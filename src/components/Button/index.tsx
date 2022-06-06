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
  loading?: boolean;
  light?: boolean;
}
const Button: React.FC<Props> = ({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Container
      style={{ opacity: enabled ? 1 : 0.5 }}
      color={color}
      enabled={enabled}
      {...rest}
    >
      {loading
        ? <ActivityIndicator color={theme.colors.background_secondary} />
        : <Title light={light}>{title}</Title>}
    </Container>
  );
};

export { Button };
