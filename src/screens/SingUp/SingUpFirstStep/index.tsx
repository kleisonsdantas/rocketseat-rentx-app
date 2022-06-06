import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';

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

const SingUpFirstStep: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNextStep = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        name: Yup.string()
          .required('Nome obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate('SingUpSecondStep' as never, { user: data } as never);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais');
      }
    }
  }, [driverLicense, email, name, navigation]);

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
              <Bullet active />
              <Bullet />
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />

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
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button
            onPress={handleNextStep}
            title="Próximo"
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SingUpFirstStep };
