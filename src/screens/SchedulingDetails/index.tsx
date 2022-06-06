import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';

interface Params {
  car: CarDTO;
  dates: string[]
}

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

const SchedulingDetails: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const [sendingSchedule, setSendingSchedule] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  const rentTotal = useMemo(() => dates.length * car.rent.price, [car, dates]);

  const handleConfirmRental = useCallback(async () => {
    setSendingSchedule(true);

    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod.startFormatted,
        endDate: rentalPeriod.endFormatted,
      });

      api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      }).then(() => {
        navigation.navigate('Confirmation' as never, {
          title: 'Carro alugado!',
          message: 'Agora você só precisa ir\naté a concessionária da RENTX\npegar seu automóvel',
          nextScreenRoute: 'Home',
        } as never);
      }).catch(() => {
        Alert.alert('Não foi possível confirmar o agendamento');
        setSendingSchedule(false);
      });
    } catch (error) {
      setSendingSchedule(false);
    }
  }, [car, dates, navigation, rentalPeriod]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, [dates]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>
              R$
              {car.rent.price}
            </Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.background_secondary}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x ${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>
              {`R$ ${rentTotal}`}
            </RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          enabled={sendingSchedule}
          loading={sendingSchedule}
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};

export { SchedulingDetails };
