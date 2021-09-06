import React from 'react';
import injectWithObserver from '../../utils/injectWithObserver';
import Hotelsearch from './Hotelsearch';
import Flightsearch from './Flightsearch';
import Carsearch from './Carsearch';
import { toJS } from 'mobx';
import { useStore } from '../../mobx/Helpers/UseStore';

function SearchComponent(props: any) {
  const store = useStore();
  const { component } = toJS(store.Search);
  return (
    <>
      {component === 'flight' ? (
        <Flightsearch search={(value: any) => props.search(value)} />
      ) : component === 'hotel' ? (
        <Hotelsearch search={() => props.search()} />
      ) : (
        <Carsearch />
      )}
    </>
  );
}
export default injectWithObserver(SearchComponent);
