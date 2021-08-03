import { inject, observer } from 'mobx-react';

export default function (component: any) {
  return inject(({ stores }) => ({ stores }))(observer(component));
}
