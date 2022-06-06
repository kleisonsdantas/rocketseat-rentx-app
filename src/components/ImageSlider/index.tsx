import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props {
  imagesUrl: string[];
}

interface ChangImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const ImageSlider: React.FC<Props> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangImageProps) => {
    const { index } = info.viewableItems[0];

    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {
        imagesUrl.map((item, index) => (
          <Bullet
            key={String(index) + item}
            active={imageIndex === index}
          />
        ))
      }
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item }}
              resizeMode="contain"
            />
          </CarImageWrapper>

        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}

      />
    </Container>
  );
};

export { ImageSlider };
