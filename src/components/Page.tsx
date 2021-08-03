/* eslint-disable react/display-name */
import React from 'react';
import { Helmet } from 'react-helmet';

const Page = ({ title = '', children, ...rest }: any) => {
  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default Page;
