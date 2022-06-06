import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}
const SingUpSecondStep: React.FC = () => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params as Params;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRegister = useCallback(async () => {
    if (!password || !passwordConfirm) {
      Alert.alert('Informe a senha e a confirmação');
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert('As senhas não são iguais');
      return;
    }

    navigation.navigate('Confirmation' as never, {
      title: 'Conta Criada!',
      message: 'Agora é só fazer login\ne aproveitar',
      nextScreenRoute: 'SignIn',
    } as never);
  }, [password, passwordConfirm, navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>
            Crie sua
            {'\n'}
            conta.
          </Title>

          <SubTitle>
            Faça seu cadastro de
            {'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <Input
              isPasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            <Input
              isPasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              autoCapitalize="none"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SingUpSecondStep };
