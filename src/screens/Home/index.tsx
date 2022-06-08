import React, { useCallback, useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  // StyleSheet
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
// } from 'react-native-reanimated';

// import {
//   RectButton,
//   PanGestureHandler,
// } from 'react-native-gesture-handler';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';
import { useAuth } from '../../hooks/auth';

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

// const styles = StyleSheet.create({
//   myCarsButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const Home: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { user } = useAuth();
  const [loadingCars, setLoadingCars] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);

  // const buttonPositionX = useSharedValue(0);
  // const buttonPositionY = useSharedValue(0);

  // const myCarsButtonAnimatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: buttonPositionX.value },
  //     { translateY: buttonPositionY.value },
  //   ],
  // }));

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = buttonPositionX.value;
  //     ctx.positionY = buttonPositionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     buttonPositionX.value = ctx.positionX + event.translationX;
  //     buttonPositionY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd() {
  //   },
  // });

  const handleCarDetails = useCallback((car: CarDTO) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }, [navigation]);

  // const handleOpenMyCars = useCallback(() => {
  //   navigation.navigate('MyCars' as never);
  // }, [navigation]);

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
          {!loadingCars && (
            <TotalCars>
              {`Total de ${cars.length} carros`}
            </TotalCars>
          )}
        </HeaderContent>
      </Header>
      { loadingCars ? <LoadAnimation />
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

      {/* <PanGestureHandler
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            myCarsButtonAnimatedStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            style={[
              styles.myCarsButton,
              { backgroundColor: theme.colors.main },
            ]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              color={theme.colors.background_secondary}
              size={32}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
};

export { Home };
