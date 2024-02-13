import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Currencies, SelectedCoinProps} from '../interfaces/dataInterface';
import {getCoins} from '../api/cryptoApi';
import {ListRender} from './ListRender';
import CloseButton from '../assets/images/close.svg';
import ArrowDown from '../assets/images/arrow-down.svg';
import SeachIcon from '../assets/images/search-normal.svg';

interface Props {
  setData: (data: any) => void;
}

export const CustomSelectModal = ({setData}: Props) => {
  const [coins, setCoins] = useState<Currencies[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<SelectedCoinProps>({
    image:
      'https://payments.pre-bnvo.com/media/crytocurrencies/CurrencyBTC_Size36_px_StrokeON.png',
    name: 'BTC_TEST',
  });
  const [filteredCoins, setFilteredCoins] = useState<Currencies[]>([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const loadCoins = async () => {
      const resp = await getCoins();
      setCoins(resp.data);
      setFilteredCoins(resp.data);
    };
    loadCoins();
  }, []);

  const searchFilterItem = (text: string) => {
    if (text) {
      const newData = coins.filter(item => {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCoins(newData);
      setSearchItem(text);
    } else {
      setFilteredCoins(coins);
      setSearchItem(text);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Seleccionar moneda</Text>
        <TouchableOpacity
          style={styles.coinContainer}
          onPress={() => setIsVisible(true)}>
          <View style={styles.imageCoinContainer}>
            <Image source={{uri: selectedCoin.image}} width={35} height={35} />
            <Text style={styles.selectedCoinText}>{selectedCoin.name}</Text>
          </View>
          <View>
            <ArrowDown />
          </View>
        </TouchableOpacity>
      </View>

      {isVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.seleccionarText}>Seleccionar criptomoneda</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <CloseButton />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <SeachIcon style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchItem}
              onChangeText={text => searchFilterItem(text)}
              placeholder="Buscar"
              placeholderTextColor={'#647184'}
            />
          </View>

          <FlatList
            data={filteredCoins}
            renderItem={({item}) => (
              <ListRender
                name={item.name}
                image={item.image}
                symbol={item.symbol}
                blockchain={item.blockchain}
                setSelectedCoin={setSelectedCoin}
                setIsVisible={setIsVisible}
                setData={setData}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  coinContainer: {
    flexDirection: 'row',
    borderColor: '#c0ccda',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCoinContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: '10%',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  seleccionarText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  selectedCoinText: {
    color: '#647184',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  searchInput: {
    borderColor: '#c0ccda',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    padding: 20,
    paddingLeft: 60,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 99,
    marginLeft: 10,
  },
});
