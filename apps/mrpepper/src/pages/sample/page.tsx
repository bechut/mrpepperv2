import { ISamplePageProps } from '@mrpepper/types';
import { FC } from 'react';
import { ConfigMoment } from '@mrpepper/moment';

const m = new ConfigMoment();

const Page: FC<ISamplePageProps> = ({ locale }) => {
  console.log('locale', locale);
  console.log('momeny', m.add(new Date(), 'day', 1).toISOString());
  return <div>Sample Page</div>;
};

export default Page;
