import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FormData} from '../interfaces/dataInterface';
import {CustomSelectModal} from '../components/CustomSelectModal';
import {sendForm} from '../api/cryptoApi';
import {DataContext} from '../context/DataContext';
import {useNavigation} from '@react-navigation/native';

export const FormScreen = () => {
  const {setIdentifier} = useContext(DataContext);
  const navigation = useNavigation();
  const [data, setData] = useState<FormData>({
    expected_output_amount: '',
    input_currency: '',
    notes: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
    checkForm();
  };

  const checkForm = () => {
    if (
      data.expected_output_amount?.trim() !== '' &&
      data.input_currency?.trim() !== '' &&
      data.notes?.trim() !== ''
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = async () => {
    const resp = await sendForm(data);
    setIdentifier(resp.data.identifier);
    navigation.navigate('CheckoutScreen');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Crear Pago</Text>
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>Importe a pagar</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={text => handleChange('expected_output_amount', text)}
            value={data.expected_output_amount}
          />
        </View>

        <CustomSelectModal setData={setData} />

        <View style={styles.downContainer}>
          <Text style={styles.subtitle}>Concepto</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => handleChange('notes', text)}
            value={data.notes}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={isDisabled}
          onPress={() => handleSubmit()}>
          <Text style={{...styles.subtitle, color: '#fff'}}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  innerContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#c0ccda',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  downContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#055ac5',
    padding: 20,
    borderRadius: 10,
    borderColor: '#c0ccda',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
