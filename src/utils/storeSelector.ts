import { Languages } from '../mobx/types';
import { User } from 'firebase';

interface ILanguageStore {
  selectedLanguage: Languages;
  changeLanguage: (lang: Languages) => any;
}

export const getLang = (stores: any): ILanguageStore => {
  const lang = stores.languageStore;
  return lang;
};

interface IUserStore {
  user: User | null;
  changeUser: (user: User | null) => any;
}

export const getUser = (stores: any): IUserStore => {
  const user = stores.userStore;
  return user;
};

interface IairLineList {
  user: User | null;
  changeUser: (user: User | null) => any;
}

export const getAirLineList = (stores: any): IairLineList => {
  const airline = stores.FlightStore;
  return airline;
};