import { FC } from 'react';
import { Button, Layout, Space, Typography } from 'antd';

import { ISampleProps } from '@mrpepper/types';

const { Text } = Typography;

const Page: FC<ISampleProps> = (props) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Space direction="vertical">
        <Text>Sample Page</Text>
        <Text>Locale: {props.locale} </Text>
        <Button type="primary">Testing</Button>
      </Space>
    </Layout>
  );
};

export default Page;
