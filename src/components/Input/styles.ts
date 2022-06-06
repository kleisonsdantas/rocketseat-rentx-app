import { BorderlessButton } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { AnyStyledComponent } from 'styled-components';

interface Props {
  isFocused: boolean;
}
export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 56px;

  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;

  padding: 0 22px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton as unknown as AnyStyledComponent)`
  height: 56px;
  width: 56px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;
