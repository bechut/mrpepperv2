import { ISamplePageProps } from '@mrpepper/types';
import { FC } from 'react';

const Page: FC<ISamplePageProps> = ({ locale }) => {
  console.log('locale', locale);
  return <div>Sample Page</div>;
};

export default Page;
