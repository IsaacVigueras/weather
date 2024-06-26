import React, {FunctionComponent} from 'react';
import {WeatherProps} from '../interfaces';
import {Image, StyleSheet, Text, View} from 'react-native';

const Weather: FunctionComponent<WeatherProps> = ({data}) => {
  if (!data) {
    return null;
  }

  const {main, weather} = data;

  const kelvin = 273.15;

  return (
    <View style={styles.weather}>
      <Text style={[styles.text, styles.current]}>
        {parseInt((main.temp - kelvin).toString(), 10)}
        <Text style={styles.temperature}>&#x2103;</Text>
        <Image
          style={styles.img}
          source={{
            uri: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
          }}
        />
      </Text>
      <View style={styles.temp}>
        <Text style={styles.text}>
          Min {''}
          <Text style={styles.temperature}>
            {parseInt((main.temp_min - kelvin).toString(), 10)} &#x2103;
          </Text>
        </Text>
        <Text style={styles.text}>
          Max {''}
          <Text style={styles.temperature}>
            {parseInt((main.temp_max - kelvin).toString(), 10)} &#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  img: {
    width: 66,
    height: 58,
  },
  temp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Weather;
