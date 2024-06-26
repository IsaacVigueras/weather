import {WeatherResponse} from './weather';

export enum CountryEnum {
  empty = '',
  US = 'US',
  MX = 'MX',
  AR = 'AR',
  CO = 'CO',
  CR = 'CR',
  ES = 'ES',
  PE = 'PE',
}

export type FormProps = {
  search: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  region: regionType;
  setRegion: React.Dispatch<React.SetStateAction<regionType>>;
};

export type WeatherProps = {
  data: WeatherResponse | undefined;
};

export type SearchType = {
  country: CountryEnum;
  city: string;
};

export type regionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';
