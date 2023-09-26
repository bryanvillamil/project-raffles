import StatusTransaction from '@/components/pages/statusTransaction/statusTransaction';
import { getDataHome } from '@/services/home';
import { IPropsHome } from '@/types/home';
import { GetStaticProps } from 'next';
import React from 'react';

const index = (props: IPropsHome) => {
	return <StatusTransaction {...props}  />;
};

export default index;


export const getStaticProps: GetStaticProps<any> = async () => {
  const data = await getDataHome();
  return {
    props: {
      ...data,
    },
  };
};

