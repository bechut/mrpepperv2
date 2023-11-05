import { FC, useEffect } from 'react';
import { Button, Layout, Space, Typography } from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { ISampleProps } from '@mrpepper/types';
import { pepperActions, pepperRootState } from '@mrpepper/redux';
import NonAuthLayout from '../../components/layout/non-auth';
import { getAppInstance } from '@mrpepper/firebase';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const Page: FC<ISampleProps> = (props) => {
  const appStates = useSelector(
    (states: pepperRootState) => states.appSlice,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(appStates);
    getAppInstance()
      .then((e) => console.log('Firebase connected successfully', e))
      .catch((e) => console.log('Firebase disconnected', e));
    dispatch(
      pepperActions.appSlice.setAlert({ message: 'sample', status: true })
    );
  }, []);

  return (
    <NonAuthLayout>
      <Layout style={{ height: '100vh' }}>
        <Space direction="vertical">
          <Text>{t('sample:title?sample')}</Text>
          <Text>
            {t('sample:button-label?change_lang')}: {props.locale}
          </Text>
          <Button type="primary">Testing</Button>
        </Space>
      </Layout>
    </NonAuthLayout>
  );
};

export default Page;
