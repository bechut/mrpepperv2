import { FC, useEffect } from 'react';
import { Button, Layout, Space, Typography } from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { ISampleProps } from '@mrpepper/types';
import { pepperActions, pepperRootState } from '@mrpepper/redux';
import NonAuthLayout from '../../components/layout/non-auth';

const { Text } = Typography;

const Page: FC<ISampleProps> = (props) => {
  const appStates = useSelector(
    (states: pepperRootState) => states.appSlice,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(appStates)
    dispatch(
      pepperActions.appSlice.setAlert({ message: 'sample', status: true })
    );
  }, []);

  return (
    <NonAuthLayout>
      <Layout style={{ height: '100vh' }}>
        <Space direction="vertical">
          <Text>Sample Page</Text>
          <Text>Locale: {props.locale} </Text>
          <Button type="primary">Testing</Button>
        </Space>
      </Layout>
    </NonAuthLayout>
  );
};

export default Page;
