import React, {Dispatch, SetStateAction} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SelectedCoinProps} from '../interfaces/dataInterface';
import ArrowRight from '../assets/images/arrow-right.svg'

interface ListRenderProps {
  name?: string;
  image?: string;
  symbol?: string;
  setSelectedCoin: Dispatch<SetStateAction<SelectedCoinProps>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setData: (data: any) => void;
  blockchain?: string;
}

export const ListRender = ({
  name,
  image,
  symbol,
  blockchain,
  setSelectedCoin,
  setIsVisible,
  setData,
}: ListRenderProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        padding: 20,
        width: '100%',
        justifyContent: 'space-between',
      }}
      onPress={() => {
        setSelectedCoin({name, image});
        setIsVisible(false);
        setData((data: any) => ({
          ...data,
          input_currency: blockchain,
        }));
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <Image source={{uri: image}} width={35} height={35} />
        <View>
          <Text style={{color: 'black'}}>{name}</Text>
          <Text style={{color: '#647184', fontSize: 12}}>{symbol}</Text>
        </View>
      </View>
      <View>
        <ArrowRight />
      </View>
    </TouchableOpacity>
  );
};
