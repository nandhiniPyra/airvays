import { action, observable } from 'mobx';
import { Languages } from '../types';

const getLanguageFromStorage = (): Languages =>
  (localStorage?.getItem('lang') || 'en') as Languages;
const setLanguageOnStorage = (lang: Languages) =>
  localStorage?.setItem('lang', lang.toString());

class LanguageStore {
  @observable selectedLanguage: Languages = getLanguageFromStorage();

  @action
  changeLanguage = (lang: Languages) => {
    this.selectedLanguage = lang;
    setLanguageOnStorage(lang);
  };
}
export default new LanguageStore();
