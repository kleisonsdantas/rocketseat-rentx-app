import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  CarList,
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

export interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}
const MyCars: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [loadingCars, setLoadingCars] = useState(true);
  const [cars, setCars] = useState<CarProps[]>([]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const fetchCars = useCallback(async () => {
    try {
      const response = await api.get('/schedules_byuser?user_id=1');

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
        <BackButton
          color={theme.colors.shape}
          onPress={handleGoBack}
        />

        <Title>
          Seus agendamentos,
          {'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        { loadingCars ? <Load />
          : (
            <CarList
              data={cars}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CarWrapper>

                  <Car
                    data={item.car}
                  />

                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>

                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>

                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />

                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>

                  </CarFooter>
                </CarWrapper>
              )}
            />
          )}
      </Content>
    </Container>
  );
};

export { MyCars };
