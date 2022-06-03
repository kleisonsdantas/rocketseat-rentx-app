import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [loadingCars, setLoadingCars] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);

  const handleCarDetails = useCallback((car: CarDTO) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }, [navigation]);

  const handleOpenMyCars = useCallback(() => {
    navigation.navigate('MyCars' as never);
  }, [navigation]);

  const fetchCars = useCallback(async () => {
    try {
      const response = await api.get('/cars');

      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCars(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            {`Total de ${cars.length || 0} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>
      { loadingCars ? <Load />
        : (
          <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Car
                data={item}
                onPress={() => handleCarDetails(item)}
              />
            )}
          />
        )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          color={theme.colors.background_secondary}
          size={32}
        />
      </MyCarsButton>
    </Container>
  );
};

export { Home };
