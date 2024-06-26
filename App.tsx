import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Form from './components/Form';
import {CountryEnum, SearchType, regionType} from './interfaces';
import {API} from './service';
import {WeatherResponse} from './interfaces/weather';
import Weather from './components/Weather';

function App(): React.JSX.Element {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: CountryEnum.empty,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [region, setRegion] = useState<regionType>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [data, setData] = useState<WeatherResponse>();
  const [bgColor, setBGColor] = useState<string>('rgb(71,149,212)');

  useEffect(() => {
    if (isValid) {
      try {
        getData();
      } catch (error) {
        Alert.alert('Error', 'Empty data, try another contry');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  const getData = async () => {
    const response = await API(
      'GET',
      // `weather?lat=${region.latitude}&lon=${region.longitude}`,
      `weather?q=${search.city},${search.country}`,
    );

    setIsValid(false);
    setData(response);

    const kelvin = 273.15;
    const {main} = response;
    const current = main.temp - kelvin;
    let color: string = '';

    if (current < 10) {
      color = 'rgb(105, 108, 149)';
    } else if (current >= 10 && current < 25) {
      color = 'rgb(71,149,212)';
    } else {
      color = 'rgb(178, 28, 61)';
    }

    setBGColor(color);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const bgColorApp: ViewStyle = {
    backgroundColor: bgColor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.container}>
            <Weather data={data} />
            <Form
              region={region}
              search={search}
              setSearchType={setSearch}
              setIsValid={setIsValid}
              setRegion={setRegion}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: '2.5%',
  },
});

export default App;
