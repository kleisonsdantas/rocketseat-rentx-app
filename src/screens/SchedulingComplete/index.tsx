import React, { useCallback } from 'react';

import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const handleConfirm = useCallback(() => {
    navigation.navigate('Home' as never);
  }, [navigation]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir
          {'\n'}
          até a concessionária da RENTX
          {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton
          title="OK"
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
};

export { SchedulingComplete };
