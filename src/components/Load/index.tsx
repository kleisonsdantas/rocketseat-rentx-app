import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

const Load: React.FC = () => {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={theme.colors.main}
      size="large"
      style={{ flex: 1 }}
    />
  );
};

export { Load };
