import axios from 'axios';
import {Method} from '../interfaces';
import {WeatherResponse} from '../interfaces/weather';

export const API = async (
  method: Method,
  url: string,
): Promise<WeatherResponse> => {
  const baseURL = 'https://api.openweathermap.org/data/2.5';
  const API_KEY = '34e6e742cc3c19b295625446100f49cb';

  const request = await axios({
    method,
    url: `${baseURL}/${url}&appid=${API_KEY}`,
  });

  return request.data;
};
