import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AnyStyledComponent } from 'styled-components';

interface ButtonProps {
 color?: string;
}

export const Container = styled(RectButton as unknown as AnyStyledComponent)<ButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) => (color || theme.colors.main)};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(13)}px;

  color: ${({ theme }) => theme.colors.background_secondary};
`;
