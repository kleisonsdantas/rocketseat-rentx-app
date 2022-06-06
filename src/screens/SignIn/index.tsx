import React, { useCallback, useState } from 'react';
import {
  Alert,
  Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles';

const SignIn: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: Yup.string()
          .required('Senha obrigatória'),
      });

      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais');
      }
    }
  }, [email, password]);

  const handleNewAccount = useCallback(() => {
    navigation.navigate('SingUpFirstStep' as never);
  }, [navigation]);

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
            <Title>
              Estamos
              {'\n'}
              quase lá.
            </Title>

            <SubTitle>
              Faça seu login para começar
              {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              isPasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              enabled
              loading={false}
              title="Login"
              onPress={handleSignIn}
            />

            <Button
              light
              loading={false}
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              color={theme.colors.background_secondary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SignIn };
