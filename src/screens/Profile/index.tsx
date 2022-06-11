import React, { useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import {
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

type OptionType = 'dataEdit' | 'passwordEdit'

const Profile: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { user, signOut, updateUser } = useAuth();

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [option, setOption] = useState<OptionType>('dataEdit');

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSignOut = useCallback(() => {
    Alert.alert(
      'Sair da aplicação',
      'Ao sair, lembre-se que precisará de internet para se conectar novamente',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
        },
      ],
    );
  }, [signOut]);

  const handleOptionChange = useCallback((value: OptionType) => {
    setOption(value);
  }, []);

  const handleUpdateProfile = useCallback(async () => {
    setIsSavingProfile(true);

    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatória'),
        name: Yup.string().required('Nome obrigatório'),
      });

      await schema.validate({ driverLicense, name });

      const updatedUser = {
        ...user,
        driver_license: driverLicense,
        name,
        avatar,
      };

      await updateUser(updatedUser);

      Alert.alert('Perfil atualizado com sucesso');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil');
      }
    } finally {
      setIsSavingProfile(false);
    }
  }, [avatar, driverLicense, name, updateUser, user]);

  const handleAvatarSelect = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{ uri: avatar }}
                  resizeMode="contain"
                />
              )}

              <PhotoButton
                onPress={handleAvatarSelect}
              >
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content
            style={{ marginBottom: useBottomTabBarHeight() }}
          >
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>

              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            { option === 'dataEdit'
              ? (
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    defaultValue={user.name}
                  />

                  <Input
                    iconName="mail"
                    editable={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    defaultValue={user.email}
                  />

                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    value={driverLicense}
                    onChangeText={setDriverLicense}
                    defaultValue={user.driver_license}
                  />
                </Section>
              )
              : (
                <Section>
                  <Input
                    isPasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                  />

                  <Input
                    isPasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                    autoCapitalize="none"
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />

                  <Input
                    isPasswordInput
                    iconName="lock"
                    placeholder="Repetir Senha"
                    autoCapitalize="none"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                  />
                </Section>
              )}
            <Button
              loading={isSavingProfile}
              enabled={!isSavingProfile}
              title="Salvar alterações"
              onPress={handleUpdateProfile}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;
