import React, { useCallback, useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  // StyleSheet
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/Car';
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
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const theme = useTheme();
  const [loadingCars, setLoadingCars] = useState(true);
  const [cars, setCars] = useState<ModelCar[]>([]);

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

  const handleCarDetails = useCallback((car: ModelCar) => {
    navigation.navigate('CarDetails' as never, { car } as never);
  }, [navigation]);

  // const handleOpenMyCars = useCallback(() => {
  //   navigation.navigate('MyCars' as never);
  // }, [navigation]);

  const offlineSynchronize = useCallback(async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
          .get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async (changes: any) => {
        const user = changes.users;
        await api.post('users/sync', user);
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars(): Promise<void> {
      try {
        const carCollection = database.get<ModelCar>('/cars');
        const localCars = await carCollection.query().fetch();

        if (isMounted) setCars(localCars);
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setLoadingCars(false);
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      console.log('Online');
    } else {
      console.log('Offline');
    }
  }, []);

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
