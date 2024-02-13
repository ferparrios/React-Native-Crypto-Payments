import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GreenCheckIcon from '../assets/images/green-check.svg';
import CancelCheckIcon from '../assets/images/cancel-icon.svg';
import {DataContext} from '../context/DataContext';
import { useNavigation } from '@react-navigation/native';


export const FinishScreen = () => {
  const {success} = useContext(DataContext);
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {success ? <GreenCheckIcon /> : <CancelCheckIcon />}
        <Text style={styles.subtitleText}>{
          success ? 'Pago Completado' : 'Pago Cancelado'
        }</Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et
          varius dolor elit facilisi enim. Nulla ut ut eu nunc.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FormScreen')}>
          <Text style={styles.buttonText}>Crear un pago</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginHorizontal: 20,
    marginVertical: '60%',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#000"
  },
  button: {
    backgroundColor: '#055ac5',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c0ccda',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionText: {
    color: "#647184"
  }
});
