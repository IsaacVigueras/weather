import React, {FunctionComponent, useState} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {CountryEnum, FormProps} from '../interfaces';
// import MapView, {Marker} from 'react-native-maps';

const Form: FunctionComponent<FormProps> = ({
  search,
  setSearchType,
  setIsValid,
}) => {
  const [animatedValue] = useState<Animated.Value>(new Animated.Value(1));

  const requestWeather = () => {
    if (search.city === '' || search.country === CountryEnum.empty) {
      Alert.alert('Error', 'The fields are required.');
      return;
    }

    setIsValid(true);
  };

  const animatedIn = (): void =>
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();

  const animatedOut = (): void =>
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 1,
      tension: 30,
      useNativeDriver: true,
    }).start();

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [{scale: animatedValue}],
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={search.city}
            onChangeText={city => setSearchType({...search, city})}
            style={styles.input}
            placeholderTextColor="#6666"
            placeholder="City"
          />
        </View>
        <View>
          <Picker
            style={styles.picker}
            itemStyle={styles.picker}
            selectedValue={search.country}
            onValueChange={country => setSearchType({...search, country})}>
            <Picker.Item
              label="-- Select a Country --"
              value={CountryEnum.empty}
            />
            <Picker.Item label="United States" value={CountryEnum.US} />
            <Picker.Item label="Mexico" value={CountryEnum.MX} />
            <Picker.Item label="Argentina" value={CountryEnum.AR} />
            <Picker.Item label="Colombia" value={CountryEnum.CO} />
            <Picker.Item label="Costa Rica" value={CountryEnum.CR} />
            <Picker.Item label="Peru" value={CountryEnum.PE} />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPress={() => requestWeather()}
          onPressIn={() => animatedIn()}
          onPressOut={() => animatedOut()}>
          <Animated.View style={[styles.btn, animatedStyle]}>
            <Text style={styles.btnText}>Search Weather</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 120,
    backgroundColor: '#FFF',
  },
  btn: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Form;
