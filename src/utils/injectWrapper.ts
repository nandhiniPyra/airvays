import { inject } from 'mobx-react';

export default function (component: any) {
  return inject(({ stores }) => ({ stores }))(component);
}
