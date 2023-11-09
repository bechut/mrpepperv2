import { FC, useEffect } from 'react';
import { Button, Layout, Space, Typography } from 'antd';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { ISampleProps } from '@mrpepper/types';
import { pepperActions, pepperRootState } from '@mrpepper/redux';
import NonAuthLayout from '../../components/layout/non-auth';
import { getAppInstance } from '@mrpepper/firebase';
import { useTranslation } from 'react-i18next';
import { ConfigMoment, IFormat, format } from '@mrpepper/moment';

const { Text } = Typography;

const Page: FC<ISampleProps> = (props) => {
  const appStates = useSelector(
    (states: pepperRootState) => states.appSlice,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const m = new ConfigMoment(props.locale);

  useEffect(() => {
    console.log(appStates);
    getAppInstance()
      .then(() =>
        console.log(
          'Firebase connected successfully',
          import.meta.env['VITE_FIREBASE_NAME']
        )
      )
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
          <>
            Moment JS
            {Object.keys(format).map((key) => (
              <div>
                <strong>{key}</strong>:{' '}
                {m.dateToString(new Date(), key as IFormat)}
              </div>
            ))}
            <Space>
              <strong>{'ISO'}</strong>: {m.dateToISOString(new Date())}
            </Space>
          </>
        </Space>
      </Layout>
    </NonAuthLayout>
  );
};

export default Page;
