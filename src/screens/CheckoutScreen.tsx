import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DataContext} from '../context/DataContext';
import {getOrderInfo} from '../api/cryptoApi';
import {InfoData} from '../interfaces/dataInterface';
import Countdown from 'react-countdown';
import QRCode from 'react-qr-code';
import {useNavigation} from '@react-navigation/native';
import Timer from '../assets/images/timer.svg';
import MetamaskLogo from '../assets/images/metamask-logo.svg';

export const CheckoutScreen = () => {
  const {identifier, setSuccess} = useContext(DataContext);

  const [paymentData, setPaymentData] = useState<InfoData[]>([]);

  const [qrPayment, setQrPayment] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getInfo = async () => {
      const resp = await getOrderInfo(identifier);
      setPaymentData(resp.data);
    };
    getInfo();

    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${identifier}`,
    );

    socket.onopen = event => {
      console.log(event);
      console.log('Connected');
    };

    socket.onclose = event => {
      console.log(event);
      console.log('Disconnected');
    };

    socket.onmessage = event => {
      const payload = JSON.parse(event.data);
      // No responde se completa por el formato del address y no se puede completar el pago
      if (payload.success) {
        setSuccess(true);
      }
      console.log(payload);
    };

    socket.onerror = error => {
      console.log(error);
      setSuccess(false);
    };
  }, []);

  const formattedDate = (date: any) => {
    return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
  };

  const renderer = ({minutes, seconds, completed}: any) => {
    if (completed) {
      navigation.navigate('FinishScreen');
    }
    return (
      <Text style={styles.descriptionText}>
        {minutes}:{seconds}
      </Text>
    );
  };

  return (
    <SafeAreaView>
      {paymentData.map(payment => (
        <ScrollView
          key={payment.identifier}
          style={styles.bodyContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={{...styles.subtitleText, fontSize: 20}}>
            Resumen del pedido
          </Text>

          <View style={styles.cardContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>Importe: </Text>
              <Text style={styles.subtitleText}>
                {payment.fiat_amount} {payment.fiat}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>Moneda seleccionada: </Text>
              <Text style={styles.subtitleText}>{payment.currency_id}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>Comercio:</Text>
              <Text style={styles.descriptionText}>
                {payment.merchant_device}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>Fecha:</Text>
              <Text style={styles.descriptionText}>
                {formattedDate(payment.created_at)}
              </Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>Concepto: </Text>
              <Text style={styles.descriptionText}>{payment.notes}</Text>
            </View>
          </View>

          <Text style={{...styles.subtitleText, fontSize: 20}}>
            Realizar el pago
          </Text>

          <View style={styles.cardContainer}>
            <View style={styles.countdownContainer}>
              <Timer />
              <Countdown
                date={new Date(payment.expired_time)}
                renderer={renderer}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={isActive ? styles.buttonActive : styles.button}
                onPress={() => {
                  setIsActive(true);
                  setQrPayment(true);
                }}>
                <Text
                  style={
                    isActive
                      ? styles.buttonTextColorActive
                      : styles.buttonTextColor
                  }>
                  SmartQR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={!isActive ? styles.buttonActive : styles.button}
                onPress={() => {
                  setIsActive(false);
                  setQrPayment(false);
                }}>
                <Text
                  style={
                    !isActive
                      ? styles.buttonTextColorActive
                      : styles.buttonTextColor
                  }>
                  Web3
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.qrMetamasContainer}>
              {qrPayment ? (
                <QRCode value={payment.address} />
              ) : (
                <View style={styles.metamaskLogoContainer}>
                  <MetamaskLogo />
                </View>
              )}
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>Enviar:</Text>
              <Text style={styles.subtitleText}>
                {payment.crypto_amount} {payment.currency_id}
              </Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.subtitleText}>{payment.address} </Text>
            </View>
          </View>
        </ScrollView>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#647184',
  },
  cardContainer: {
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 50,
    gap: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  bodyContainer: {marginHorizontal: 20},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonActive: {
    backgroundColor: '#055ac5',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c0ccda',
  },
  button: {
    padding: 20,
    borderRadius: 10,
  },
  buttonTextColor: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonTextColorActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  qrMetamasContainer: {
    alignItems: 'center',
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  metamaskLogoContainer: {
    backgroundColor: '#fff',
    width: '90%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
