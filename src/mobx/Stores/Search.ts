import { action, observable, makeObservable } from 'mobx';
import { persist } from 'mobx-persist';
import { serializable } from 'serializr';
import { create } from 'mobx-persist';

const hydrate = create({
  jsonify: true,
  storage: localStorage,
});

class search {
  @serializable @persist @observable component?: String | null = 'flight';
  @serializable @persist @observable currentPage?: Boolean | null = false;

  @action setComponent = (req: any) => {
    this.component = req;
  };

  @action setCurrentPage = (req: any) => {
    this.currentPage = req;
  };

  constructor() {
    makeObservable(this);
  }
}
export const Search = new search();
hydrate('search', Search).then(() => console.log('Search has been hydrated'));
