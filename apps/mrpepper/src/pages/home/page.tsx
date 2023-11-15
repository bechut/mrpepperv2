import { ISamplePageProps } from '@mrpepper/types';
import { FC } from 'react';
import AuthLayout from '../../components/layout/auth';

const Page: FC<ISamplePageProps> = ({ locale }) => {
  return <AuthLayout>Home Page</AuthLayout>;
};

export default Page;
