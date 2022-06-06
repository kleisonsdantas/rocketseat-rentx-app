import React, { useCallback, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BorderlessButton } from 'react-native-gesture-handler';
import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  isPasswordInput?: boolean;
  value?: string;
}

const Input: React.FC<Props> = ({
  iconName,
  isPasswordInput = false,
  value,
  ...rest
}) => {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handlePasswordVisibilityChange = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          color={(isFocused || isFilled)
            ? theme.colors.main
            : theme.colors.text}
          size={24}
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        secureTextEntry={!isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      {isPasswordInput
        && (
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <IconContainer isFocused={isFocused}>
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              color={theme.colors.text}
              size={24}

            />
          </IconContainer>
        </BorderlessButton>
        )}
    </Container>
  );
};

export { Input };
