import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;

  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;

  margin-top: ${getStatusBarHeight() + 115}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary600};

  color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary400};

  color: ${({ theme }) => theme.colors.text};

  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;

  margin: 64px 0;
`;

export const Footer = styled.View``;
